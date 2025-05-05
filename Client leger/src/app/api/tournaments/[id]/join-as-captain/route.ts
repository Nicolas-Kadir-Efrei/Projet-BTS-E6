import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth';
import { sendTournamentRequest } from '@/lib/notifications';
import { Prisma, User, Tournament, Team, TeamMember } from '@prisma/client';

interface ExtendedSession {
  user: AuthUser;
}

type TournamentWithTeams = Tournament & {
  teams: (Team & {
    members: (TeamMember & {
      user: User;
    })[];
  })[];
  creator: User;
};

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const tournamentId = Number(params.id);
    const userId = parseInt(session.user.id);

    // Vérifier si l'utilisateur est déjà membre d'une équipe dans ce tournoi
    const existingTeamMember = await prisma.teamMember.findFirst({
      where: {
        userId: userId,
        team: {
          tournamentId: tournamentId
        }
      }
    });

    if (existingTeamMember) {
      return NextResponse.json(
        { error: 'Vous êtes déjà membre d\'une équipe dans ce tournoi' },
        { status: 400 }
      );
    }

    // Vérifier si le tournoi existe
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        teams: {
          include: {
            members: {
              include: {
                user: true
              }
            }
          }
        },
        creator: true
      }
    }) as TournamentWithTeams | null;

    if (!tournament) {
      return NextResponse.json({ error: 'Tournoi non trouvé' }, { status: 404 });
    }

    // Vérifier si l'utilisateur est le créateur du tournoi
    if (tournament.creator.id === userId) {
      return NextResponse.json(
        { error: 'Le créateur du tournoi ne peut pas rejoindre en tant que capitaine' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur n'est pas déjà capitaine d'une équipe
    const isAlreadyCaptain = tournament.teams.some(team =>
      team.members.some(member => 
        member.userId === userId && member.role === 'captain'
      )
    );

    if (isAlreadyCaptain) {
      return NextResponse.json(
        { error: 'Vous êtes déjà capitaine d\'une équipe dans ce tournoi' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur n'a pas déjà une demande en attente
    const hasPendingRequest = tournament.teams.some(team =>
      team.members.some(member => 
        member.userId === userId && member.role === 'pending'
      )
    );

    if (hasPendingRequest) {
      return NextResponse.json(
        { error: 'Vous avez déjà une demande en attente' },
        { status: 400 }
      );
    }

    // Créer une nouvelle équipe avec l'utilisateur comme capitaine en attente
    const team = await prisma.team.create({
      data: {
        teamName: `Équipe de ${session.user.pseudo}`,
        tournament: {
          connect: { id: tournamentId }
        },
        members: {
          create: {
            userId: userId,
            role: 'pending'
          }
        }
      }
    });

    // Envoyer une notification au créateur du tournoi
    await sendTournamentRequest(
      tournament.creator.id,
      tournament.tournamentName,
      tournament.id
    );

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la demande de participation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la demande de participation' },
      { status: 500 }
    );
  }
}
