import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer tous les jeux
export async function GET(req: NextRequest) {
  console.log("Début de la requête GET pour récupérer les jeux");
  
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
    
    // Récupérer tous les jeux
    const games = await prisma.game.findMany({
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(games);
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST: Créer un nouveau jeu
export async function POST(req: NextRequest) {
  console.log("Début de la requête POST pour créer un jeu");
  
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
    
    // Récupérer les données du jeu
    const data = await req.json();
    
    if (!data.name) {
      return NextResponse.json({ error: "Le nom du jeu est requis" }, { status: 400 });
    }
    
    // Vérifier si le jeu existe déjà
    const existingGame = await prisma.game.findFirst({
      where: { name: data.name }
    });
    
    if (existingGame) {
      return NextResponse.json({ error: "Un jeu avec ce nom existe déjà" }, { status: 400 });
    }
    
    // Créer le jeu
    const newGame = await prisma.game.create({
      data: {
        name: data.name,
        image_path: data.image_path || null
      }
    });
    
    return NextResponse.json(newGame, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du jeu:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
