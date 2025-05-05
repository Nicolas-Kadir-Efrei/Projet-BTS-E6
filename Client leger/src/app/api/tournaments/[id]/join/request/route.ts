import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("Début de la requête POST pour rejoindre un tournoi");
  
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
    console.log(`Tentative de création de demande - TournamentId: ${tournamentId}, UserId: ${userId}`);

    // Vérifie si une demande existe déjà
    const existing = await prisma.joinRequest.findFirst({
      where: { tournamentId, userId },
    });
    
    if (existing) {
      console.log("Demande existante trouvée:", existing);
      
      // Si la demande existante a été refusée, permettre une nouvelle demande
      if (existing.status === "rejected") {
        console.log("La demande précédente a été refusée, mise à jour vers 'pending'");
        
        // Mettre à jour la demande existante vers 'pending'
        const updatedRequest = await prisma.joinRequest.update({
          where: { id: existing.id },
          data: { status: "pending" },
        });
        
        console.log("Demande mise à jour avec succès:", updatedRequest);
        return NextResponse.json({ ok: true, request: updatedRequest });
      }
      
      // Si la demande est en attente ou acceptée, ne pas permettre une nouvelle demande
      if (existing.status === "pending") {
        return NextResponse.json({ error: "Votre demande est déjà en attente" }, { status: 400 });
      } else if (existing.status === "accepted") {
        return NextResponse.json({ error: "Vous êtes déjà accepté dans ce tournoi" }, { status: 400 });
      }
      
      return NextResponse.json({ error: "Déjà demandé" }, { status: 400 });
    }

    // Création de la demande
    const newRequest = await prisma.joinRequest.create({
      data: {
        tournamentId,
        userId,
        status: "pending",
      },
    });
    
    console.log("Nouvelle demande créée avec succès:", newRequest);
    return NextResponse.json({ ok: true, request: newRequest });
  } catch (error) {
    console.error("Erreur lors de la création de la demande:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
