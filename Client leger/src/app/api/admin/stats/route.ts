import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  console.log("Début de la requête GET pour récupérer les statistiques admin");
  
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
    
    // Vérifier si l'utilisateur est un admin
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!user || user.role !== 'admin') {
      console.log("Erreur: L'utilisateur n'est pas un administrateur");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Récupérer les statistiques
    const [
      usersCount,
      tournamentsCount,
      teamsCount,
      pendingRequestsCount,
      gamesCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.tournament.count(),
      prisma.team.count(),
      prisma.joinRequest.count({
        where: { status: "pending" }
      }),
      prisma.game.count()
    ]);
    
    const stats = {
      users: usersCount,
      tournaments: tournamentsCount,
      teams: teamsCount,
      pendingRequests: pendingRequestsCount,
      games: gamesCount
    };
    
    console.log("Statistiques récupérées avec succès:", stats);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
