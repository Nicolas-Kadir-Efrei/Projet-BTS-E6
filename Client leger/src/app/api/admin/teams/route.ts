import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/admin/teams - Récupérer toutes les équipes
export async function GET(req: NextRequest) {
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
    
    // Récupérer toutes les équipes avec leurs membres et le tournoi associé
    const teams = await prisma.team.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                pseudo: true
              }
            }
          }
        },
        tournament: {
          select: {
            id: true,
            tournamentName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des équipes' },
      { status: 500 }
    );
  }
}

// POST /api/admin/teams - Créer une nouvelle équipe
export async function POST(req: NextRequest) {
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
    const admin = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Récupérer les données de la nouvelle équipe
    const data = await req.json();
    
    // Vérifier si le tournoi existe
    const tournament = await prisma.tournament.findUnique({
      where: { id: data.tournamentId }
    });
    
    if (!tournament) {
      return NextResponse.json(
        { error: 'Le tournoi spécifié n\'existe pas' },
        { status: 400 }
      );
    }
    
    // Créer la nouvelle équipe
    const newTeam = await prisma.team.create({
      data: {
        teamName: data.teamName,
        description: data.description,
        maxMembers: data.maxMembers || 5,
        tournamentId: data.tournamentId,
        // Ajouter le créateur comme membre de l'équipe si spécifié
        ...(data.creatorId ? {
          members: {
            create: {
              userId: data.creatorId,
              role: 'leader'
            }
          }
        } : {})
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                pseudo: true
              }
            }
          }
        },
        tournament: {
          select: {
            id: true,
            tournamentName: true
          }
        }
      }
    });
    
    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'équipe' },
      { status: 500 }
    );
  }
}
