import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/admin/teams/[id] - Récupérer une équipe spécifique
export async function GET(
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
    
    // Vérifier si l'utilisateur est un admin ou le leader de l'équipe
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    const teamMember = await prisma.teamMember.findFirst({
      where: {
        userId: Number(userData.id),
        teamId: Number(params.id),
        role: 'leader'
      }
    });
    
    if ((!user || user.role !== 'admin') && !teamMember) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Récupérer l'équipe spécifique avec ses membres et le tournoi associé
    const team = await prisma.team.findUnique({
      where: { id: Number(params.id) },
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
            tournamentName: true,
            game: true
          }
        }
      }
    });
    
    if (!team) {
      return NextResponse.json({ error: 'Équipe non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json(team);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'équipe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'équipe' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/teams/[id] - Mettre à jour une équipe
export async function PUT(
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
    
    // Vérifier si l'utilisateur est un admin ou le leader de l'équipe
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    const teamMember = await prisma.teamMember.findFirst({
      where: {
        userId: Number(userData.id),
        teamId: Number(params.id),
        role: 'leader'
      }
    });
    
    if ((!user || user.role !== 'admin') && !teamMember) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Vérifier si l'équipe à mettre à jour existe
    const existingTeam = await prisma.team.findUnique({
      where: { id: Number(params.id) }
    });
    
    if (!existingTeam) {
      return NextResponse.json({ error: 'Équipe non trouvée' }, { status: 404 });
    }
    
    // Récupérer les données de mise à jour
    const data = await req.json();
    
    // Mettre à jour l'équipe
    const updatedTeam = await prisma.team.update({
      where: { id: Number(params.id) },
      data: {
        teamName: data.teamName,
        description: data.description,
        maxMembers: data.maxMembers
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
    
    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'équipe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'équipe' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/teams/[id] - Supprimer une équipe
export async function DELETE(
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
    
    // Vérifier si l'utilisateur est un admin
    const admin = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Vérifier si l'équipe à supprimer existe
    const existingTeam = await prisma.team.findUnique({
      where: { id: Number(params.id) }
    });
    
    if (!existingTeam) {
      return NextResponse.json({ error: 'Équipe non trouvée' }, { status: 404 });
    }
    
    // Supprimer d'abord tous les membres de l'équipe
    await prisma.teamMember.deleteMany({
      where: { teamId: Number(params.id) }
    });
    
    // Supprimer l'équipe
    await prisma.team.delete({
      where: { id: Number(params.id) }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'équipe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'équipe' },
      { status: 500 }
    );
  }
}
