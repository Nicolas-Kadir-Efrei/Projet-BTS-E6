import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/tournament-status?tournamentId=X
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tournamentId = parseInt(searchParams.get('tournamentId'));

        if (!tournamentId) {
            return NextResponse.json({ error: 'Tournament ID is required' }, { status: 400 });
        }

        const status = await prisma.tournamentStatus.findUnique({
            where: { tournamentId }
        });

        return NextResponse.json(status || { status: 'not_started' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/tournament-status
export async function POST(request) {
    try {
        const body = await request.json();
        const { tournamentId, status } = body;

        // Vérifier que le statut est valide
        const validStatuses = ['registration', 'in_progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
                { status: 400 }
            );
        }

        // Créer ou mettre à jour le statut
        const tournamentStatus = await prisma.tournamentStatus.upsert({
            where: { tournamentId },
            update: { status },
            create: {
                tournamentId,
                status
            }
        });

        // Si le tournoi est marqué comme terminé ou annulé, mettre à jour tous les matches en attente
        if (status === 'completed' || status === 'cancelled') {
            await prisma.match.updateMany({
                where: {
                    tournamentId,
                    status: 'pending'
                },
                data: {
                    status: 'cancelled'
                }
            });
        }

        return NextResponse.json(tournamentStatus);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
