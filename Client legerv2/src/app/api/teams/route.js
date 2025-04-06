// src/app/teams/route.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { tournamentId, teamName } = body;

    // Création de l'équipe et attribution du nom dans la base de données avec Prisma
    const team = await prisma.team.create({
      data: {
        tournamentId,
        teamName,
      },
    });

    return NextResponse.json(
      { success: true, data: team },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
    