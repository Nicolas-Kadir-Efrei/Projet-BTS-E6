import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendRequestAccepted, sendRequestRejected } from '@/lib/notifications';
import type { AuthUser } from '@/lib/auth';
import { Prisma } from '@prisma/client';

interface ExtendedSession {
  user: AuthUser;
}

type TournamentWithTeamsAndMembers = Prisma.TournamentGetPayload<{
  include: {
    teams: {
      include: {
        members: {
          include: {
            user: true;
          };
        };
      };
    };
    creator: true;
  };
}>;

export async function POST(
  request: Request,
  { params }: { params: { id: string; teamId: string } }
) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { action } = await request.json();
    const tournamentId = Number(params.id);
    const teamId = Number(params.teamId);

    // Vérifier si le tournoi existe
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        teams: {
          where: { id: teamId },
          include: {
            members: {
              where: { role: 'pending' },
              include: { user: true }
            }
          }
        },
        creator: true
      }
    }) as TournamentWithTeamsAndMembers | null;

    if (!tournament) {
      return NextResponse.json({ error: 'Tournoi non trouvé' }, { status: 404 });
    }

    // Vérifier si l'utilisateur est le créateur du tournoi
    if (tournament.creator.id !== session.user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const team = tournament.teams[0];
    if (!team) {
      return NextResponse.json({ error: 'Équipe non trouvée' }, { status: 404 });
    }

    const pendingMember = team.members[0];
    if (!pendingMember) {
      return NextResponse.json({ error: 'Aucune demande en attente' }, { status: 404 });
    }

    if (action === 'accept') {
      // Accepter la demande
      await prisma.teamMember.update({
        where: { id: pendingMember.id },
        data: { role: 'captain' }
      });

      // Envoyer une notification d'acceptation
      await sendRequestAccepted(
        pendingMember.userId,
        tournament.tournamentName,
        tournament.id
      );

      return NextResponse.json({ message: 'Demande acceptée' });
    } else if (action === 'reject') {
      // Supprimer l'équipe si le capitaine est rejeté
      await prisma.team.delete({
        where: { id: teamId }
      });

      // Envoyer une notification de rejet
      await sendRequestRejected(
        pendingMember.userId,
        tournament.tournamentName,
        tournament.id
      );

      return NextResponse.json({ message: 'Demande rejetée' });
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 });
  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la demande' },
      { status: 500 }
    );
  }
}
