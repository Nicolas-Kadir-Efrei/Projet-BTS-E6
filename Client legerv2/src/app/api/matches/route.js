import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/matches?tournamentId=X
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tournamentId = parseInt(searchParams.get('tournamentId'));

        if (!tournamentId) {
            return NextResponse.json({ error: 'Tournament ID is required' }, { status: 400 });
        }

        const matches = await prisma.match.findMany({
            where: { tournamentId },
            include: {
                team1: {
                    select: {
                        id: true,
                        teamName: true
                    }
                },
                team2: {
                    select: {
                        id: true,
                        teamName: true
                    }
                },
                winner: {
                    select: {
                        id: true,
                        teamName: true
                    }
                }
            }
        });

        return NextResponse.json(matches);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/matches
export async function POST(request) {
    try {
        const body = await request.json();
        const { tournamentId, team1Id, team2Id, matchDate } = body;

        // Vérifier que les équipes appartiennent au même tournoi
        const teams = await prisma.team.findMany({
            where: {
                id: {
                    in: [team1Id, team2Id]
                },
                tournamentId
            }
        });

        if (teams.length !== 2) {
            return NextResponse.json(
                { error: 'Both teams must belong to the specified tournament' },
                { status: 400 }
            );
        }

        const match = await prisma.match.create({
            data: {
                tournamentId,
                team1Id,
                team2Id,
                matchDate: new Date(matchDate),
                status: 'pending'
            },
            include: {
                team1: {
                    select: {
                        teamName: true
                    }
                },
                team2: {
                    select: {
                        teamName: true
                    }
                }
            }
        });

        return NextResponse.json(match);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH /api/matches/[id]
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id, team1Score, team2Score, status } = body;

        let winnerId = null;
        if (team1Score !== undefined && team2Score !== undefined) {
            winnerId = team1Score > team2Score ? body.team1Id : team2Score > team1Score ? body.team2Id : null;
        }

        const match = await prisma.match.update({
            where: { id },
            data: {
                team1Score,
                team2Score,
                winnerId,
                status
            },
            include: {
                team1: {
                    select: {
                        teamName: true
                    }
                },
                team2: {
                    select: {
                        teamName: true
                    }
                },
                winner: {
                    select: {
                        teamName: true
                    }
                }
            }
        });

        return NextResponse.json(match);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
