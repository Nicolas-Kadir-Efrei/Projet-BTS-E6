import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; inviteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour annuler une invitation' },
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
        { error: 'Vous n\'avez pas les droits pour annuler une invitation' },
        { status: 403 }
      );
    }

    // Vérifier si l'invitation existe
    const invite = await prisma.teamInvite.findFirst({
      where: {
        id: params.inviteId,
        team_id: params.id,
        status: 'PENDING',
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: 'Invitation non trouvée' },
        { status: 404 }
      );
    }

    // Supprimer l'invitation
    await prisma.teamInvite.delete({
      where: {
        id: params.inviteId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error canceling team invite:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'annulation de l\'invitation' },
      { status: 500 }
    );
  }
}
