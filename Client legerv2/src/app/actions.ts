"use server";

import prisma from "@/lib/prisma";

// Récupérer tous les utilisateurs
export async function getUsers() {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                pseudo: true,
                name: true,
                email: true,
                // On n'inclut pas le mot de passe pour des raisons de sécurité
            }
        });
        return users;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch users");
    }
}

// Récupérer un utilisateur par son ID
export async function getUserById(id: number) {
    try {
        const user = await prisma.users.findUnique({
            where: { id },
            include: {
                tournaments_as_creator: true, // Inclut les tournois créés par l'utilisateur
            }
        });
        return user;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch user");
    }
}

// Créer un nouveau tournoi
export async function createTournament(data: {
    name: string,
    description: string,
    creator_id: number,
    game_id: number,
    tournament_type_id: number,
    start_date: Date,
    max_players: number
}) {
    try {
        const tournament = await prisma.tournaments.create({
            data: {
                ...data,
                status: 'PENDING', // Status par défaut
                created_at: new Date(),
            },
            include: {
                creator: true,
                game: true,
                tournament_type: true,
            }
        });
        return tournament;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to create tournament");
    }
}

// Récupérer les tournois avec filtres
export async function getTournaments({
    status,
    gameId,
    page = 1,
    limit = 10
}: {
    status?: 'PENDING' | 'ONGOING' | 'FINISHED',
    gameId?: number,
    page?: number,
    limit?: number
}) {
    try {
        const skip = (page - 1) * limit;
        const where = {
            ...(status && { status }),
            ...(gameId && { game_id: gameId })
        };

        const [tournaments, total] = await Promise.all([
            prisma.tournaments.findMany({
                where,
                skip,
                take: limit,
                include: {
                    creator: {
                        select: {
                            id: true,
                            pseudo: true,
                        }
                    },
                    game: true,
                    tournament_type: true,
                },
                orderBy: {
                    created_at: 'desc'
                }
            }),
            prisma.tournaments.count({ where })
        ]);

        return {
            tournaments,
            total,
            pages: Math.ceil(total / limit)
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch tournaments");
    }
}
