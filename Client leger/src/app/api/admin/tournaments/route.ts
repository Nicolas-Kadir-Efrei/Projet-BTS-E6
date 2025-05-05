import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer tous les tournois
export async function GET(req: NextRequest) {
  console.log("Début de la requête GET pour récupérer les tournois (admin)");
  
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
    
    console.log('Récupération des tournois...');
    try {
      // Récupérer tous les tournois avec leurs informations de base
      // Utiliser une sous-requête pour obtenir le dernier statut de chaque tournoi
      const tournaments = await prisma.$queryRaw`
        WITH latest_status AS (
          SELECT DISTINCT ON ("tournamentId") "tournamentId", status
          FROM tournament_status
          ORDER BY "tournamentId", "updatedAt" DESC
        )
        SELECT 
          t.id, t."tournamentName", t."startDate", t."startTime", t.format, t."maxParticipants",
          g.id as "gameId", g.name as "gameName", g.image_path as "gameImagePath",
          ls.status as status,
          tt.type as "tournamentType"
        FROM tournaments t
        LEFT JOIN games g ON t."gameId" = g.id
        LEFT JOIN latest_status ls ON t.id = ls."tournamentId"
        LEFT JOIN tournament_types tt ON t."tournament_typeId" = tt.id
        ORDER BY t."createdAt" DESC
      `;
      
      console.log(`${Array.isArray(tournaments) ? tournaments.length : 0} tournois récupérés`);
      
      // Formater les données pour le front-end
      const formattedTournaments = Array.isArray(tournaments) ? tournaments.map((tournament: any) => {
        return {
          id: tournament.id,
          name: tournament.tournamentName,
          type: tournament.format,
          status: tournament.status || 'upcoming',  // Utiliser le statut récupéré de la requête SQL
          startDate: new Date(tournament.startDate).toISOString(),
          startTime: tournament.startTime,
          maxParticipants: tournament.maxParticipants,
          game: {
            id: tournament.gameId,
            name: tournament.gameName,
            image_path: tournament.gameImagePath
          }
        };
      }) : [];
      
      console.log('Tournois formatés:', formattedTournaments);
      
      return NextResponse.json(formattedTournaments);
    } catch (error) {
      console.error("Erreur détaillée lors de la récupération des tournois:", error);
      return NextResponse.json({ error: "Erreur serveur lors de la récupération des tournois" }, { status: 500 });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des tournois:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST: Créer un nouveau tournoi
export async function POST(req: NextRequest) {
  console.log("Début de la requête POST pour créer un tournoi");
  
  // Récupérer le token d'autorisation
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  
  try {
    // Vérifier et décoder le token
    const userData = verifyToken(token);
    
    if (!userData || !userData.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Vérifier si l'utilisateur est un admin
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true, id: true }
    });
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Récupérer les données du tournoi
    const data = await req.json();
    
    // Validation des données
    if (!data.tournamentName || !data.gameId || !data.startDate || !data.format || !data.maxParticipants) {
      return NextResponse.json({ 
        error: "Informations manquantes pour la création du tournoi" 
      }, { status: 400 });
    }
    
    // Vérifier si le jeu existe
    const game = await prisma.game.findUnique({
      where: { id: Number(data.gameId) }
    });
    
    if (!game) {
      return NextResponse.json({ error: "Jeu non trouvé" }, { status: 404 });
    }
    
    // Créer le tournoi
    const newTournament = await prisma.tournament.create({
      data: {
        tournamentName: data.tournamentName,
        startDate: new Date(data.startDate),
        startTime: data.startTime || "18:00",
        format: data.format,
        maxParticipants: Number(data.maxParticipants),
        // Utiliser le champ 'rules' pour stocker la description si nécessaire
        rules: data.rules || "",
        // Utiliser le champ 'rewards' pour stocker les prix
        rewards: data.prizes || "",
        createdById: Number(userData.id),
        gameId: Number(data.gameId),
        // Ajouter les champs manquants requis par le schéma
        minTeams: data.minTeams || 2,
        playersPerTeam: data.playersPerTeam || 1,
        totalPlayers: data.totalPlayers || Number(data.maxParticipants),
        updatedAt: new Date(),
        tournament_typeId: data.tournament_typeId || 1, // Valeur par défaut, à ajuster selon votre schéma
      },
      include: {
        game: true,
        status: true
      }
    });
    
    // Créer le statut initial du tournoi
    try {
      await prisma.tournamentStatus.create({
        data: {
          tournamentId: newTournament.id,
          status: "upcoming",
          updatedAt: new Date() // Champ requis par le schéma
        }
      });
      
      console.log(`Statut 'upcoming' créé pour le tournoi ${newTournament.id}`);
    } catch (statusError) {
      console.error("Erreur lors de la création du statut du tournoi:", statusError);
      // On continue même si la création du statut échoue
    }
    
    return NextResponse.json(newTournament, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du tournoi:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
