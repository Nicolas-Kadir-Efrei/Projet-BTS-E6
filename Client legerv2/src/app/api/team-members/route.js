import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/team-members?teamId=X
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const teamId = parseInt(searchParams.get('teamId'));

        if (!teamId) {
            return NextResponse.json({ error: 'Team ID is required' }, { status: 400 });
        }

        const members = await prisma.teamMember.findMany({
            where: { teamId },
            include: {
                user: {
                    select: {
                        id: true,
                        pseudo: true,
                        name: true,
                        last_name: true
                    }
                }
            }
        });

        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/team-members
export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, teamId, role } = body;

        // Vérifier si l'utilisateur est déjà dans l'équipe
        const existingMember = await prisma.teamMember.findFirst({
            where: {
                userId,
                teamId
            }
        });

        if (existingMember) {
            return NextResponse.json(
                { error: 'User is already a member of this team' },
                { status: 400 }
            );
        }

        // Vérifier si l'équipe a déjà un capitaine si le rôle demandé est 'captain'
        if (role === 'captain') {
            const existingCaptain = await prisma.teamMember.findFirst({
                where: {
                    teamId,
                    role: 'captain'
                }
            });

            if (existingCaptain) {
                return NextResponse.json(
                    { error: 'Team already has a captain' },
                    { status: 400 }
                );
            }
        }

        const member = await prisma.teamMember.create({
            data: {
                userId,
                teamId,
                role
            },
            include: {
                user: {
                    select: {
                        pseudo: true,
                        name: true,
                        last_name: true
                    }
                }
            }
        });

        return NextResponse.json(member);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/team-members?userId=X&teamId=Y
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = parseInt(searchParams.get('userId'));
        const teamId = parseInt(searchParams.get('teamId'));

        if (!userId || !teamId) {
            return NextResponse.json(
                { error: 'User ID and Team ID are required' },
                { status: 400 }
            );
        }

        await prisma.teamMember.delete({
            where: {
                userId_teamId: {
                    userId,
                    teamId
                }
            }
        });

        return NextResponse.json({ message: 'Member removed successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
