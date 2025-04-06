import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    // Récupération des données envoyées depuis le client
    const {
      tournamentName,
      startDate,
      startTime,
      gameId,
      tournamentTypeId,
      format,
      rules,
      numTeams,
      playersPerTeam,
      rewards,
    } = await req.json();

    // Affiche les données reçues pour déboguer
    console.log("Données reçues:", {
      tournamentName,
      startDate,
      startTime,
      gameId,
      tournamentTypeId,
      format,
      rules,
      numTeams,
      playersPerTeam,
      rewards,
    });

    // Vérification de la présence de toutes les données nécessaires
    if (
      !tournamentName ||
      !startDate ||
      !startTime ||
      !gameId ||
      !tournamentTypeId ||
      !numTeams ||
      !playersPerTeam
    ) {
      console.error("Données manquantes");
      return new Response("Données manquantes", { status: 400 });
    }

    // Validation du format de la date
    const parsedStartDate = new Date(startDate);
    if (isNaN(parsedStartDate.getTime())) {
      console.error("Date invalide");
      return new Response("Date de début invalide", { status: 400 });
    }

    // Enregistrement du tournoi dans la base de données
    const newTournament = await prisma.tournament.create({
      data: {
        tournamentName,
        startDate: parsedStartDate,
        startTime,
        gameId: parseInt(gameId),
        tournamentTypeId: parseInt(tournamentTypeId),
        format: format || "Non spécifié",
        rules: rules || "Aucune règle définie",
        numTeams: parseInt(numTeams),
        playersPerTeam: parseInt(playersPerTeam),
        rewards,
      },
    });

    console.log("Tournoi créé avec succès:", newTournament);

    return new Response(JSON.stringify(newTournament), { status: 201 });
  } catch (error) {
    // Affichage de l'erreur complète pour débogage
    console.error("Erreur lors de la création du tournoi:", error);
    return new Response("Erreur lors de la création du tournoi", {
      status: 500,
    });
  }
}
