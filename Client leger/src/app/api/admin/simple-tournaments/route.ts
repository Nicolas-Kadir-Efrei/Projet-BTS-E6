import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer tous les tournois avec une approche simplifiée
export async function GET(req: NextRequest) {
  console.log("Début de la requête GET pour récupérer les tournois (version simplifiée)");
  
  // Récupérer le token d'autorisation
  const authHeader = req.headers.get('authorization');
  console.log('Header d\'autorisation présent:', !!authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Erreur: Token d\'autorisation manquant ou mal formaté');
    return NextResponse.json({ error: "Unauthorized - Token manquant ou mal formaté" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  console.log('Token extrait du header');
  
  try {
    // Vérifier et décoder le token
    console.log('Vérification du token...');
    const userData = verifyToken(token);
    console.log('Token vérifié, données utilisateur:', userData ? 'Données présentes' : 'Données absentes');
    
    if (!userData || !userData.id) {
      console.log('Erreur: Token invalide ou expiré');
      return NextResponse.json({ error: "Unauthorized - Token invalide ou expiré" }, { status: 401 });
    }
    
    // Vérifier si l'utilisateur est un admin
    console.log('Vérification du rôle admin pour l\'utilisateur ID:', userData.id);
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true, email: true }
    });
    
    console.log('Utilisateur trouvé:', user ? `Email: ${user.email}, Rôle: ${user.role}` : 'Non trouvé');
    
    if (!user) {
      console.log('Erreur: Utilisateur non trouvé dans la base de données');
      return NextResponse.json({ error: "Unauthorized - Utilisateur non trouvé" }, { status: 401 });
    }
    
    if (user.role !== 'admin') {
      console.log('Erreur: L\'utilisateur n\'est pas un administrateur');
      return NextResponse.json({ error: "Forbidden - Accès réservé aux administrateurs" }, { status: 403 });
    }
    
    console.log('Récupération des tournois avec une approche simplifiée...');
    
    // Utiliser une requête SQL brute pour éviter les problèmes de relations
    const tournaments = await prisma.$queryRaw`
      SELECT 
        t.id, 
        t."tournamentName", 
        t."startDate", 
        t.format,
        g.name as "gameName"
      FROM tournaments t
      LEFT JOIN games g ON t."gameId" = g.id
      ORDER BY t."createdAt" DESC
    `;
    
    console.log(`${Array.isArray(tournaments) ? tournaments.length : 0} tournois récupérés`);
    
    // Formater les données pour le front-end
    const formattedTournaments = Array.isArray(tournaments) ? tournaments.map((t: any) => ({
      id: t.id,
      tournamentName: t.tournamentName,
      startDate: t.startDate,
      format: t.format,
      game: {
        name: t.gameName
      }
    })) : [];
    
    return NextResponse.json(formattedTournaments);
  } catch (error) {
    console.error("Erreur détaillée lors de la récupération des tournois:", error);
    return NextResponse.json({ error: "Erreur serveur lors de la récupération des tournois" }, { status: 500 });
  }
}
