import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { status } = await request.json();

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      );
    }

    // Vérifier que l'invitation appartient à l'utilisateur
    const invitation = await prisma.teamInvitation.findFirst({
      where: {
        id: params.id,
        user_id: session.user.id,
        status: 'PENDING',
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation non trouvée' },
        { status: 404 }
      );
    }

    // Mettre à jour l'invitation
    const updatedInvitation = await prisma.teamInvitation.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    });

    // Si l'invitation est acceptée, ajouter l'utilisateur à l'équipe
    if (status === 'ACCEPTED') {
      await prisma.teamMember.create({
        data: {
          team_id: invitation.team_id,
          user_id: session.user.id,
          role: 'MEMBER',
        },
      });
    }

    return NextResponse.json(updatedInvitation);
  } catch (error: any) {
    console.error('Error updating invitation:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour de l\'invitation' },
      { status: 500 }
    );
  }
}
