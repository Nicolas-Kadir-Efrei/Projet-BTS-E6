import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer un tournoi spécifique
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(`Début de la requête GET pour récupérer le tournoi ${params.id} (admin)`);
  
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
      select: { role: true }
    });
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Récupérer le tournoi avec ses informations
    console.log(`Tentative de récupération du tournoi avec l'ID: ${params.id}`);
    
    // Récupérer le tournoi avec ses informations
    const tournament = await prisma.tournament.findUnique({
      where: { id: Number(params.id) },
      include: {
        game: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        teams: true,
        joinRequests: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                pseudo: true
              }
            }
          }
        },
        status: {
          orderBy: {
            updatedAt: 'desc'
          },
          take: 1
        }
      }
    });
    
    console.log("Tournoi récupéré avec succès:", tournament ? "Trouvé" : "Non trouvé");
    
    if (!tournament) {
      return NextResponse.json({ error: "Tournoi non trouvé" }, { status: 404 });
    }
    
    // Formater les données pour le front-end
    const currentStatus = tournament?.status?.length > 0 ? tournament.status[0].status : 'upcoming';
    
    // Calculer les participants à partir des équipes
    const participants = [];
    if (tournament.teams) {
      for (const team of tournament.teams) {
        // Nous n'avons pas accès aux membres de l'équipe directement, donc nous utilisons juste l'équipe
        participants.push({
          id: team.id,
          name: team.teamName
        });
      }
    }
    
    const formattedTournament = {
      id: tournament.id,
      name: tournament.tournamentName,
      type: tournament.format,
      status: currentStatus,
      startDate: tournament.startDate.toISOString(),
      startTime: tournament.startTime,
      description: '', // Ce champ n'existe pas dans le schéma, on utilise une chaîne vide
      rules: tournament.rules,
      prizes: tournament.rewards || '',
      participantsCount: participants.length,
      maxParticipants: tournament.maxParticipants,
      participants: participants,
      pendingRequests: tournament.joinRequests?.map((jr: any) => ({
        id: jr.id,
        userId: jr.userId,
        name: jr.user?.name || jr.user?.pseudo || jr.user?.email || 'Utilisateur inconnu',
        requestDate: jr.createdAt
      })) || [],
      game: tournament.game ? {
        id: tournament.game.id,
        name: tournament.game.name,
        image_path: tournament.game.image_path || ''
      } : null,
      createdBy: tournament.creator ? {
        id: tournament.creator.id,
        name: tournament.creator.name,
        email: tournament.creator.email
      } : null
    };
    
    return NextResponse.json(formattedTournament);
  } catch (error) {
    console.error(`Erreur lors de la récupération du tournoi ${params.id}:`, error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT: Mettre à jour un tournoi
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(`Début de la requête PUT pour mettre à jour le tournoi ${params.id}`);
  
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
      select: { role: true }
    });
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Vérifier si le tournoi existe
    const tournamentExists = await prisma.tournament.findUnique({
      where: { id: Number(params.id) }
    });
    
    if (!tournamentExists) {
      return NextResponse.json({ error: "Tournoi non trouvé" }, { status: 404 });
    }
    
    // Récupérer les données de mise à jour
    const data = await req.json();
    console.log('Données reçues pour la mise à jour:', data);
    
    // Préparer les données à mettre à jour
    const updateData: any = {};
    
    if (data.tournamentName) updateData.tournamentName = data.tournamentName;
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.startTime) updateData.startTime = data.startTime;
    if (data.format) updateData.format = data.format;
    if (data.maxParticipants) updateData.maxParticipants = Number(data.maxParticipants);
    // Le champ description n'existe pas dans le schéma, nous l'ignorons
    if (data.rules !== undefined) updateData.rules = data.rules;
    // Utiliser rewards au lieu de prizes pour correspondre au schéma
    if (data.prizes !== undefined) updateData.rewards = data.prizes;
    if (data.gameId) updateData.gameId = Number(data.gameId);
    
    // Mettre à jour le statut si nécessaire
    // Récupérer le statut actuel du tournoi
    const tournamentStatus = await prisma.tournamentStatus.findMany({
      where: { tournamentId: Number(params.id) },
      orderBy: { updatedAt: 'desc' },
      take: 1
    });
    
    const currentStatus = tournamentStatus.length > 0 ? tournamentStatus[0].status : 'upcoming';
    console.log('Statut actuel du tournoi:', currentStatus, 'Nouveau statut:', data.status);
    
    // Toujours mettre à jour le statut du tournoi s'il est fourni
    if (data.status) {
      console.log('Mise à jour du statut du tournoi de', currentStatus, 'à', data.status);
      
      try {
        // D'abord, supprimer tous les anciens statuts pour éviter les doublons
        await prisma.tournamentStatus.deleteMany({
          where: { tournamentId: Number(params.id) }
        });
        
        // Ensuite, créer un nouveau statut pour le tournoi
        await prisma.tournamentStatus.create({
          data: {
            tournamentId: Number(params.id),
            status: data.status,
            updatedAt: new Date()
          }
        });
        console.log('Statut du tournoi mis à jour avec succès');
      } catch (statusError) {
        console.error('Erreur lors de la mise à jour du statut:', statusError);
        throw new Error(`Erreur lors de la mise à jour du statut: ${(statusError as Error).message}`);
      }
    }
    
    console.log('Données de mise à jour:', updateData);
    
    try {
      // Mettre à jour le tournoi
      const updatedTournament = await prisma.tournament.update({
        where: { id: Number(params.id) },
        data: updateData
      });
      
      // Récupérer le tournoi mis à jour avec ses relations
      const tournamentWithRelations = await prisma.tournament.findUnique({
        where: { id: Number(params.id) },
        include: {
          game: true,
          status: {
            orderBy: {
              updatedAt: 'desc'
            },
            take: 1
          }
        }
      });
      
      console.log('Tournoi mis à jour avec succès');
      return NextResponse.json(tournamentWithRelations);
    
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du tournoi ${params.id}:`, error);
      return NextResponse.json({ error: "Erreur serveur: " + (error as Error).message }, { status: 500 });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du tournoi ${params.id}:`, error);
    return NextResponse.json({ error: "Erreur serveur: " + (error as Error).message }, { status: 500 });
  }
}

// DELETE: Supprimer un tournoi
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(`Début de la requête DELETE pour supprimer le tournoi ${params.id}`);
  
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
      select: { role: true }
    });
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Vérifier si le tournoi existe
    const tournament = await prisma.tournament.findUnique({
      where: { id: Number(params.id) }
    });
    
    if (!tournament) {
      return NextResponse.json({ error: "Tournoi non trouvé" }, { status: 404 });
    }
    
    // Supprimer les relations associées au tournoi
    // Supprimer les statuts
    await prisma.tournamentStatus.deleteMany({
      where: { tournamentId: Number(params.id) }
    });
    
    // Supprimer les demandes de participation
    await prisma.joinRequest.deleteMany({
      where: { tournamentId: Number(params.id) }
    });
    
    // Supprimer les équipes (qui sont les participants)
    await prisma.team.deleteMany({
      where: { tournamentId: Number(params.id) }
    });
    
    // Supprimer les équipes associées
    await prisma.team.deleteMany({
      where: { tournamentId: Number(params.id) }
    });
    
    // Supprimer le tournoi
    await prisma.tournament.delete({
      where: { id: Number(params.id) }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Erreur lors de la suppression du tournoi ${params.id}:`, error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
