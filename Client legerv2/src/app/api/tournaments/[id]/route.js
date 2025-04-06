import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Nettoyer l'ID des crochets s'ils sont présents
    const cleanId = params.id.replace(/[\[\]]/g, '');
    const id = parseInt(cleanId);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID de tournoi invalide" },
        { status: 400 }
      );
    }
    
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        game: true,
        tournament_types: true,
        teams: {
          include: {
            members: {
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
            }
          }
        },
        matches: {
          include: {
            team1: true,
            team2: true,
            winner: true
          }
        },
        status: true
      }
    });

    if (!tournament) {
      return NextResponse.json(
        { message: "Tournoi non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(tournament);
  } catch (error) {
    console.error("Erreur lors de la récupération du tournoi:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération du tournoi: " + error.message },
      { status: 500 }
    );
  }
}
