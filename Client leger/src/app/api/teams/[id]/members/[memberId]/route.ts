import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; memberId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour retirer un membre' },
        { status: 401 }
      );
    }

    // Vérifier si l'utilisateur est le capitaine
    const team = await prisma.team.findUnique({
      where: { id: params.id },
      include: {
        members: {
          where: {
            user_id: session.user.id,
            role: 'CAPTAIN',
          },
        },
      },
    });

    if (!team) {
      return NextResponse.json(
        { error: 'Équipe non trouvée' },
        { status: 404 }
      );
    }

    if (team.members.length === 0) {
      return NextResponse.json(
        { error: 'Vous n\'avez pas les droits pour retirer un membre' },
        { status: 403 }
      );
    }

    // Vérifier que le membre à retirer n'est pas le capitaine
    const memberToRemove = await prisma.teamMember.findFirst({
      where: {
        team_id: params.id,
        user_id: params.memberId,
      },
    });

    if (!memberToRemove) {
      return NextResponse.json(
        { error: 'Membre non trouvé' },
        { status: 404 }
      );
    }

    if (memberToRemove.role === 'CAPTAIN') {
      return NextResponse.json(
        { error: 'Vous ne pouvez pas retirer le capitaine de l\'équipe' },
        { status: 403 }
      );
    }

    // Retirer le membre
    await prisma.teamMember.delete({
      where: {
        id: memberToRemove.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error removing team member:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du retrait du membre' },
      { status: 500 }
    );
  }
}
