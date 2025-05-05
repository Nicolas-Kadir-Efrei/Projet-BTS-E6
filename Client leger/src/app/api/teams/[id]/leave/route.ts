import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour quitter une équipe' },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est membre de l'équipe
    const membership = await prisma.teamMember.findFirst({
      where: {
        team_id: params.id,
        user_id: session.user.id,
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Vous n\'êtes pas membre de cette équipe' },
        { status: 404 }
      );
    }

    // Vérifier que l'utilisateur n'est pas le capitaine
    if (membership.role === 'CAPTAIN') {
      return NextResponse.json(
        { error: 'Le capitaine ne peut pas quitter l\'équipe. Transférez d\'abord la propriété à un autre membre.' },
        { status: 403 }
      );
    }

    // Retirer l'utilisateur de l'équipe
    await prisma.teamMember.delete({
      where: {
        id: membership.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error leaving team:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la tentative de quitter l\'équipe' },
      { status: 500 }
    );
  }
}
