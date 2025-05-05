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
        { error: 'Vous devez être connecté pour inviter des membres' },
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
        { error: 'Vous n\'avez pas les droits pour inviter des membres' },
        { status: 403 }
      );
    }

    const { email } = await request.json();

    // Vérifier si l'utilisateur existe
    const invitedUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!invitedUser) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur est déjà membre
    const existingMember = await prisma.teamMember.findFirst({
      where: {
        team_id: params.id,
        user_id: invitedUser.id,
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: 'Cet utilisateur est déjà membre de l\'équipe' },
        { status: 400 }
      );
    }

    // Vérifier si une invitation est déjà en attente
    const existingInvite = await prisma.teamInvite.findFirst({
      where: {
        team_id: params.id,
        email: email,
        status: 'PENDING',
      },
    });

    if (existingInvite) {
      return NextResponse.json(
        { error: 'Une invitation est déjà en attente pour cet utilisateur' },
        { status: 400 }
      );
    }

    // Créer l'invitation
    const invite = await prisma.teamInvite.create({
      data: {
        team_id: params.id,
        email: email,
        status: 'PENDING',
      },
    });

    // TODO: Envoyer un email d'invitation

    return NextResponse.json(invite);
  } catch (error: any) {
    console.error('Error inviting team member:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'invitation' },
      { status: 500 }
    );
  }
}
