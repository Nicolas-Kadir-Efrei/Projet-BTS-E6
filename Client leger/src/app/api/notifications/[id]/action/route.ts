import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const userId = Number(userData.id);
    const notificationId = Number(params.id);
    
    // Récupérer la notification
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId }
    });
    
    if (!notification) {
      return NextResponse.json({ error: 'Notification non trouvée' }, { status: 404 });
    }
    
    // Vérifier que la notification appartient à l'utilisateur
    if (notification.userId !== userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    // Récupérer les données de l'action
    const { action, data } = await req.json();
    
    if (!action) {
      return NextResponse.json({ error: 'Action requise' }, { status: 400 });
    }
    
    // Traiter l'action en fonction du type de notification
    switch (notification.type) {
      case 'TEAM_INVITE':
        return await handleTeamInvite(notification, action, userId, data);
      case 'TOURNAMENT_REQUEST':
        return await handleTournamentRequest(notification, action, userId, data);
      default:
        return NextResponse.json({ 
          error: `Type de notification non pris en charge: ${notification.type}` 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors du traitement de l\'action:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de l\'action' },
      { status: 500 }
    );
  }
}

async function handleTeamInvite(notification: any, action: string, userId: number, data: any) {
  try {
    // Extraire les données nécessaires de la notification
    const notificationData = notification.data as { teamId: number };
    const teamId = notificationData.teamId;
    
    // Vérifier que l'équipe existe
    const team = await prisma.team.findUnique({
      where: { id: teamId }
    });
    
    if (!team) {
      return NextResponse.json({ error: 'Équipe non trouvée' }, { status: 404 });
    }
    
    if (action === 'ACCEPT') {
      // Vérifier si l'utilisateur est déjà membre de l'équipe
      const existingMember = await prisma.teamMember.findUnique({
        where: {
          userId_teamId: {
            userId,
            teamId
          }
        }
      });
      
      if (existingMember) {
        return NextResponse.json({ 
          error: 'Vous êtes déjà membre de cette équipe' 
        }, { status: 400 });
      }
      
      // Ajouter l'utilisateur à l'équipe
      await prisma.teamMember.create({
        data: {
          userId,
          teamId,
          role: 'member'
        }
      });
      
      // Créer une notification pour le créateur de l'équipe
      await prisma.notification.create({
        data: {
          userId: team.tournamentId, // Supposons que c'est l'ID du créateur de l'équipe
          type: 'TEAM_MEMBER_JOINED',
          title: 'Nouveau membre dans l\'équipe',
          message: `Un utilisateur a rejoint votre équipe ${team.teamName}`,
          data: { teamId, userId }
        }
      });
      
      // Marquer la notification comme lue
      await prisma.notification.update({
        where: { id: notification.id },
        data: { isRead: true }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: `Vous avez rejoint l'équipe ${team.teamName}` 
      });
    } 
    else if (action === 'REJECT') {
      // Marquer la notification comme lue
      await prisma.notification.update({
        where: { id: notification.id },
        data: { isRead: true }
      });
      
      // Créer une notification pour le créateur de l'équipe
      await prisma.notification.create({
        data: {
          userId: team.tournamentId, // Supposons que c'est l'ID du créateur de l'équipe
          type: 'TEAM_INVITE_REJECTED',
          title: 'Invitation refusée',
          message: `Un utilisateur a refusé de rejoindre votre équipe ${team.teamName}`,
          data: { teamId, userId }
        }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: `Vous avez refusé de rejoindre l'équipe ${team.teamName}` 
      });
    } 
    else {
      return NextResponse.json({ 
        error: `Action non prise en charge: ${action}` 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors du traitement de l\'invitation d\'équipe:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de l\'invitation d\'équipe' },
      { status: 500 }
    );
  }
}

async function handleTournamentRequest(notification: any, action: string, userId: number, data: any) {
  try {
    // Extraire les données nécessaires de la notification
    const notificationData = notification.data as { requestId: number, tournamentId: number };
    const requestId = notificationData.requestId;
    const tournamentId = notificationData.tournamentId;
    
    // Vérifier que la demande existe
    const joinRequest = await prisma.joinRequest.findUnique({
      where: { id: requestId },
      include: {
        tournament: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!joinRequest) {
      return NextResponse.json({ error: 'Demande non trouvée' }, { status: 404 });
    }
    
    // Vérifier que l'utilisateur est admin ou le créateur du tournoi
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId }
    });
    
    if (!tournament) {
      return NextResponse.json({ error: 'Tournoi non trouvé' }, { status: 404 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    const isAdmin = user.role === 'admin';
    const isCreator = tournament.createdById === userId;
    
    if (!isAdmin && !isCreator) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    if (action === 'ACCEPT') {
      // Mettre à jour le statut de la demande
      await prisma.joinRequest.update({
        where: { id: requestId },
        data: { status: 'accepted' }
      });
      
      // Créer une notification pour l'utilisateur qui a fait la demande
      await prisma.notification.create({
        data: {
          userId: joinRequest.userId,
          type: 'REQUEST_ACCEPTED',
          title: 'Demande acceptée',
          message: `Votre demande pour rejoindre le tournoi ${joinRequest.tournament.tournamentName} a été acceptée`,
          data: { tournamentId }
        }
      });
      
      // Marquer la notification comme lue
      await prisma.notification.update({
        where: { id: notification.id },
        data: { isRead: true }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: `Demande acceptée pour le tournoi ${joinRequest.tournament.tournamentName}` 
      });
    } 
    else if (action === 'REJECT') {
      // Mettre à jour le statut de la demande
      await prisma.joinRequest.update({
        where: { id: requestId },
        data: { status: 'rejected' }
      });
      
      // Créer une notification pour l'utilisateur qui a fait la demande
      await prisma.notification.create({
        data: {
          userId: joinRequest.userId,
          type: 'REQUEST_REJECTED',
          title: 'Demande refusée',
          message: `Votre demande pour rejoindre le tournoi ${joinRequest.tournament.tournamentName} a été refusée`,
          data: { tournamentId }
        }
      });
      
      // Marquer la notification comme lue
      await prisma.notification.update({
        where: { id: notification.id },
        data: { isRead: true }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: `Demande refusée pour le tournoi ${joinRequest.tournament.tournamentName}` 
      });
    } 
    else {
      return NextResponse.json({ 
        error: `Action non prise en charge: ${action}` 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de tournoi:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la demande de tournoi' },
      { status: 500 }
    );
  }
}
