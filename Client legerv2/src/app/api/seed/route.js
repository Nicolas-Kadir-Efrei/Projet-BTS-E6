import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Ajouter les jeux
    const games = await Promise.all([
      prisma.game.upsert({
        where: { name: 'Overwatch' },
        update: {},
        create: { name: 'Overwatch' }
      }),
      prisma.game.upsert({
        where: { name: 'Valorant' },
        update: {},
        create: { name: 'Valorant' }
      }),
      prisma.game.upsert({
        where: { name: 'League of Legends' },
        update: {},
        create: { name: 'League of Legends' }
      })
    ]);

    // Ajouter les types de tournois
    const tournamentTypes = await Promise.all([
      prisma.tournament_types.upsert({
        where: { type: 'Pro' },
        update: {},
        create: { type: 'Pro' }
      }),
      prisma.tournament_types.upsert({
        where: { type: 'Semi-pro' },
        update: {},
        create: { type: 'Semi-pro' }
      }),
      prisma.tournament_types.upsert({
        where: { type: 'Amateur' },
        update: {},
        create: { type: 'Amateur' }
      }),
      prisma.tournament_types.upsert({
        where: { type: 'Débutant' },
        update: {},
        create: { type: 'Débutant' }
      })
    ]);

    return NextResponse.json({
      message: "Données de test ajoutées avec succès",
      games,
      tournamentTypes
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout des données de test:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'ajout des données de test: " + error.message },
      { status: 500 }
    );
  }
}
