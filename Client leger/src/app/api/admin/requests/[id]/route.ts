import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer une demande de participation spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête GET pour récupérer la demande ${params.id}`);
  
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
    
    const requestId = parseInt(params.id);
    
    if (isNaN(requestId)) {
      return NextResponse.json({ error: "ID de demande invalide" }, { status: 400 });
    }
    
    // Récupérer la demande
    const joinRequest = await prisma.joinRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            pseudo: true
          }
        },
        tournament: {
          select: {
            id: true,
            tournamentName: true,
            startDate: true,
            game: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    
    if (!joinRequest) {
      return NextResponse.json({ error: "Demande non trouvée" }, { status: 404 });
    }
    
    return NextResponse.json(joinRequest);
  } catch (error) {
    console.error("Erreur lors de la récupération de la demande:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PATCH: Mettre à jour le statut d'une demande
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête PATCH pour mettre à jour la demande ${params.id}`);
  
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
    
    const requestId = parseInt(params.id);
    
    if (isNaN(requestId)) {
      return NextResponse.json({ error: "ID de demande invalide" }, { status: 400 });
    }
    
    // Vérifier si la demande existe
    const joinRequest = await prisma.joinRequest.findUnique({
      where: { id: requestId },
      include: {
        tournament: true
      }
    });
    
    if (!joinRequest) {
      return NextResponse.json({ error: "Demande non trouvée" }, { status: 404 });
    }
    
    // Récupérer les données de mise à jour
    const data = await req.json();
    
    if (!data.status || !['pending', 'accepted', 'rejected'].includes(data.status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }
    
    // Si la demande est acceptée, vérifier le nombre de participants
    if (data.status === 'accepted') {
      // Compter le nombre actuel de participants
      const participantsCount = await prisma.participant.count({
        where: { tournamentId: joinRequest.tournamentId }
      });
      
      // Vérifier si le tournoi est plein
      if (participantsCount >= joinRequest.tournament.maxParticipants) {
        return NextResponse.json({ 
          error: "Le tournoi a atteint son nombre maximum de participants" 
        }, { status: 400 });
      }
      
      // Si la demande est acceptée, ajouter l'utilisateur comme participant
      if (joinRequest.status !== 'accepted') {
        await prisma.participant.create({
          data: {
            userId: joinRequest.userId,
            tournamentId: joinRequest.tournamentId
          }
        });
      }
    } else if (data.status === 'rejected' && joinRequest.status === 'accepted') {
      // Si la demande passe d'acceptée à rejetée, supprimer le participant
      await prisma.participant.deleteMany({
        where: {
          userId: joinRequest.userId,
          tournamentId: joinRequest.tournamentId
        }
      });
    }
    
    // Mettre à jour la demande
    const updatedRequest = await prisma.joinRequest.update({
      where: { id: requestId },
      data: {
        status: data.status
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            pseudo: true
          }
        },
        tournament: {
          select: {
            id: true,
            tournamentName: true,
            startDate: true,
            game: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la demande:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE: Supprimer une demande
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête DELETE pour supprimer la demande ${params.id}`);
  
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
    
    const requestId = parseInt(params.id);
    
    if (isNaN(requestId)) {
      return NextResponse.json({ error: "ID de demande invalide" }, { status: 400 });
    }
    
    // Vérifier si la demande existe
    const joinRequest = await prisma.joinRequest.findUnique({
      where: { id: requestId }
    });
    
    if (!joinRequest) {
      return NextResponse.json({ error: "Demande non trouvée" }, { status: 404 });
    }
    
    // Si la demande était acceptée, supprimer également le participant
    if (joinRequest.status === 'accepted') {
      await prisma.participant.deleteMany({
        where: {
          userId: joinRequest.userId,
          tournamentId: joinRequest.tournamentId
        }
      });
    }
    
    // Supprimer la demande
    await prisma.joinRequest.delete({
      where: { id: requestId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la demande:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
