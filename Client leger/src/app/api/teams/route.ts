import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le token d'autorisation
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour créer une équipe' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7); // Enlever 'Bearer '
    
    // Vérifier et décoder le token
    const userData = await verifyToken(token);
    
    if (!userData || !userData.id) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      );
    }
    
    const userId = Number(userData.id);
    const { name, tag, description, logo_url, invitedUsers } = await request.json();

    // Vérifier si le nom d'équipe existe déjà
    const existingTeam = await prisma.team.findFirst({
      where: {
        teamName: { equals: name, mode: 'insensitive' }
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: 'Une équipe avec ce nom ou ce tag existe déjà' },
        { status: 400 }
      );
    }

    // Trouver un tournoi disponible pour associer l'équipe
    const tournaments = await prisma.tournament.findMany({
      take: 1,
      orderBy: {
        id: 'asc'
      }
    });
    
    if (tournaments.length === 0) {
      return NextResponse.json(
        { error: 'Aucun tournoi disponible pour créer une équipe. Veuillez créer un tournoi d\'abord.' },
        { status: 400 }
      );
    }
    
    // Créer l'équipe avec le premier tournoi disponible
    const team = await prisma.team.create({
      data: {
        teamName: name,
        tournamentId: tournaments[0].id,
        createdAt: new Date(),
      },
    });
    
    // Ajouter le capitaine
    await prisma.teamMember.create({
      data: {
        userId: userId,
        teamId: team.id,
        role: 'CAPTAIN',
        joined_at: new Date()
      },
    });
    
    // Ajouter les utilisateurs invités si fournis
    if (invitedUsers && Array.isArray(invitedUsers) && invitedUsers.length > 0) {
      for (const invitedUserId of invitedUsers) {
        await prisma.teamMember.create({
          data: {
            teamId: team.id, // Utiliser teamId au lieu de team_id
            userId: Number(invitedUserId), // Utiliser userId au lieu de user_id
            role: 'MEMBER',
            joined_at: new Date()
          },
        });
      }
    }

    return NextResponse.json(team);
  } catch (error: any) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de l\'équipe' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token d'autorisation
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour voir les équipes' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7); // Enlever 'Bearer '
    
    // Vérifier et décoder le token
    const userData = await verifyToken(token);
    
    if (!userData || !userData.id) {
      return NextResponse.json(
        { error: 'Session invalide ou expirée' },
        { status: 401 }
      );
    }
    
    const userId = Number(userData.id);

    const teams = await prisma.team.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(teams);
  } catch (error: any) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des équipes' },
      { status: 500 }
    );
  }
}
