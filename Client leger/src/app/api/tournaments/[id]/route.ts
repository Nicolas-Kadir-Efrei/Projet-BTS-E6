import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Tournament, Team, TeamMember, User, Game, TournamentType, TournamentStatus } from '@prisma/client';

type TournamentWithTeamsAndCreator = Tournament & {
  teams: (Team & {
    members: (TeamMember & {
      user: User;
    })[];
  })[];
  createdBy: User;
  game: Game;
  tournamentType: TournamentType;
  status: TournamentStatus[];
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const tournament = await prisma.tournament.findUnique({
      where: { id: parseInt(params.id) },
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
        createdBy: true,
        game: true,
        tournamentType: true,
        status: true
      }
    }) as TournamentWithTeamsAndCreator | null;

    if (!tournament) {
      return NextResponse.json(
        { error: 'Tournoi non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(tournament);
  } catch (error) {
    console.error('Error fetching tournament:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du tournoi' },
      { status: 500 }
    );
  }
}
