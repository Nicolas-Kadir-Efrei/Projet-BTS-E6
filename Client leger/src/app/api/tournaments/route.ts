import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Fetch tournaments with related data
    const tournaments = await prisma.tournament.findMany({
      include: {
        game: {
          select: {
            name: true,
          },
        },
        status: {
          select: {
            status: true,
          },
          orderBy: {
            updatedAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json(
      { error: 'Error fetching tournaments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      tournamentName,
      gameId,
      tournament_typeId,
      startDate,
      startTime,
      format,
      rules,
      maxParticipants,
      minTeams,
      playersPerTeam,
      totalPlayers,
      rewards
    } = body;

    // Create tournament
    const tournament = await prisma.tournament.create({
      data: {
        tournamentName,
        gameId,
        tournament_typeId,
        startDate: new Date(startDate),
        startTime,
        format,
        rules,
        maxParticipants,
        minTeams,
        playersPerTeam,
        totalPlayers,
        rewards,
        updatedAt: new Date(),
        status: {
          create: {
            status: 'OPEN',
            updatedAt: new Date()
          }
        }
      },
      include: {
        game: true,
        tournamentType: true,
        status: true
      }
    });

    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json(
      { error: 'Error creating tournament' },
      { status: 500 }
    );
  }
}
