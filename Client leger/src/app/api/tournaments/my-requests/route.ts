import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  console.log("Début de la requête GET pour récupérer les demandes de tournoi");
  
  // Récupérer le token d'autorisation
  const authHeader = req.headers.get('authorization');
  console.log("En-tête d'autorisation:", authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Erreur: Token d'autorisation manquant ou invalide");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  
  try {
    // Vérifier et décoder le token
    const userData = verifyToken(token);
    console.log("Données utilisateur du token:", userData);
    
    if (!userData || !userData.id) {
      console.log("Erreur: Token invalide ou expiré");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = Number(userData.id);
    console.log(`Récupération des demandes pour le créateur userId=${userId}`);

  // Récupère tous les tournois créés par l'utilisateur
  const tournaments = await prisma.tournament.findMany({
    where: { 
      createdById: userId 
    },
    select: {
      id: true,
      tournamentName: true,
      joinRequests: {
        where: {
          status: "pending"
        },
        include: {
          user: {
            select: {
              id: true,
              pseudo: true,
              email: true,
              sexe: true,
              name: true,
              last_name: true
            }
          }
        }
      }
    }
  });

  // Filtre les tournois qui ont des demandes en attente
  const tournamentsWithRequests = tournaments.filter(
    tournament => tournament.joinRequests.length > 0
  );

  console.log(`Tournois trouvés: ${tournaments.length}, Tournois avec demandes: ${tournamentsWithRequests.length}`);
  
  // Afficher des détails sur chaque tournoi et ses demandes
  tournaments.forEach(tournament => {
    console.log(`Tournoi ID=${tournament.id}, Nom=${tournament.tournamentName}, Demandes=${tournament.joinRequests.length}`);
    if (tournament.joinRequests.length > 0) {
      tournament.joinRequests.forEach(req => {
        console.log(`  - Demande ID=${req.id}, Utilisateur=${req.user.pseudo}, Status=${req.status}`);
      });
    }
  });

  return NextResponse.json(tournamentsWithRequests);
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
