import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("Début de la requête GET pour vérifier le statut d'une demande");
  
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
    
    const url = new URL(req.url!);
    const userId = Number(url.searchParams.get("userId"));
    const tournamentId = Number(params.id);
    console.log(`Vérification du statut - TournamentId: ${tournamentId}, UserId: ${userId}`);

    if (!userId || !tournamentId) {
      return NextResponse.json({ status: null });
    }

    const joinRequest = await prisma.joinRequest.findFirst({
      where: { userId, tournamentId },
    });

    console.log("Demande trouvée:", joinRequest);
    return NextResponse.json({ status: joinRequest?.status || null });
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
