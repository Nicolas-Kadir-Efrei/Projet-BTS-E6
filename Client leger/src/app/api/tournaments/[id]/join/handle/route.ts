import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("Début de la requête POST pour gérer une demande de participation");
  
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
    
    const tournamentId = Number(params.id);
    const userId = Number(userData.id);
    const { requestId, action } = await req.json();
    console.log(`Tentative de gestion de demande - TournamentId: ${tournamentId}, UserId: ${userId}, RequestId: ${requestId}, Action: ${action}`);

    // Vérifie que l'utilisateur connecté est bien le créateur du tournoi
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });
    
    console.log("Tournoi trouvé:", tournament);
    console.log(`Créateur du tournoi: ${tournament?.createdById}, Utilisateur connecté: ${userId}`);
    
    if (!tournament || tournament.createdById !== userId) {
      console.log("Erreur: L'utilisateur n'est pas le créateur du tournoi");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Met à jour le statut de la demande
    const updated = await prisma.joinRequest.update({
      where: { id: requestId },
      data: { status: action === "accept" ? "accepted" : "rejected" },
    });
    
    console.log("Demande mise à jour avec succès:", updated);
    return NextResponse.json({ ok: true, updated });
  } catch (error) {
    console.error("Erreur lors de la gestion de la demande:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
