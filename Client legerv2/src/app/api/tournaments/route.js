// pages/api/tournaments.js

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      tournamentName,
      startDate,
      startTime,
      gameId,
      tournament_typesId,
      format,
      rules,
      maxParticipants,
      rewards,
      numTeams,
      playersPerTeam,
      totalPlayers,
    } = data;

    const newTournament = await prisma.tournament.create({
      data: {
        tournamentName,
        startDate: new Date(startDate),
        startTime,
        gameId: parseInt(gameId),
        tournament_typesId: parseInt(tournament_typesId),
        format,
        rules: rules || null,
        maxParticipants: parseInt(maxParticipants),
        rewards: rewards || null,
        numTeams: parseInt(numTeams),
        playersPerTeam: parseInt(playersPerTeam),
        totalPlayers: parseInt(totalPlayers),
      },
    });

    // Créer le statut initial du tournoi
    await prisma.tournamentStatus.create({
      data: {
        tournamentId: newTournament.id,
        status: 'registration'
      }
    });

    return NextResponse.json({
      message: "Tournoi créé avec succès",
      tournament: newTournament,
    });
  } catch (error) {
    console.error("Erreur lors de la création du tournoi:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création du tournoi: " + error.message },
      { status: 500 }
    );
  }
}

// GET tous les tournois
export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        game: true,
        tournament_types: true,
        status: true
      }
    });
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error("Erreur lors de la récupération des tournois:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des tournois" },
      { status: 500 }
    );
  }
}
