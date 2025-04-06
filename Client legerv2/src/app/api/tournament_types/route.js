import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tournamentTypes = await prisma.tournament_types.findMany({
      select: {
        id: true,
        type: true
      }
    });
    
    return NextResponse.json(tournamentTypes);
  } catch (error) {
    console.error("Erreur lors de la récupération des types de tournois:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des types de tournois" },
      { status: 500 }
    );
  }
}
