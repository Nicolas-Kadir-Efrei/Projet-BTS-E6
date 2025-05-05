import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// DELETE: Supprimer un jeu
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête DELETE pour supprimer le jeu ${params.id}`);
  
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
    
    const gameId = parseInt(params.id);
    
    if (isNaN(gameId)) {
      return NextResponse.json({ error: "ID de jeu invalide" }, { status: 400 });
    }
    
    // Vérifier si le jeu existe
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        tournaments: true
      }
    });
    
    if (!game) {
      return NextResponse.json({ error: "Jeu non trouvé" }, { status: 404 });
    }
    
    // Vérifier si le jeu est utilisé dans des tournois
    if (game.tournaments.length > 0) {
      return NextResponse.json({ 
        error: "Impossible de supprimer ce jeu car il est utilisé dans des tournois" 
      }, { status: 400 });
    }
    
    // Supprimer le jeu
    await prisma.game.delete({
      where: { id: gameId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du jeu:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// GET: Récupérer un jeu spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête GET pour récupérer le jeu ${params.id}`);
  
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
    
    const gameId = parseInt(params.id);
    
    if (isNaN(gameId)) {
      return NextResponse.json({ error: "ID de jeu invalide" }, { status: 400 });
    }
    
    // Récupérer le jeu
    const game = await prisma.game.findUnique({
      where: { id: gameId }
    });
    
    if (!game) {
      return NextResponse.json({ error: "Jeu non trouvé" }, { status: 404 });
    }
    
    return NextResponse.json(game);
  } catch (error) {
    console.error("Erreur lors de la récupération du jeu:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PATCH: Mettre à jour un jeu
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête PATCH pour mettre à jour le jeu ${params.id}`);
  
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
    
    const gameId = parseInt(params.id);
    
    if (isNaN(gameId)) {
      return NextResponse.json({ error: "ID de jeu invalide" }, { status: 400 });
    }
    
    // Vérifier si le jeu existe
    const existingGame = await prisma.game.findUnique({
      where: { id: gameId }
    });
    
    if (!existingGame) {
      return NextResponse.json({ error: "Jeu non trouvé" }, { status: 404 });
    }
    
    // Récupérer les données de mise à jour
    const data = await req.json();
    
    if (!data.name) {
      return NextResponse.json({ error: "Le nom du jeu est requis" }, { status: 400 });
    }
    
    // Vérifier si le nom est déjà utilisé par un autre jeu
    if (data.name !== existingGame.name) {
      const nameExists = await prisma.game.findFirst({
        where: { 
          name: data.name,
          id: { not: gameId }
        }
      });
      
      if (nameExists) {
        return NextResponse.json({ error: "Un jeu avec ce nom existe déjà" }, { status: 400 });
      }
    }
    
    // Mettre à jour le jeu
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        name: data.name,
        image_path: data.image_path || existingGame.image_path
      }
    });
    
    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du jeu:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
