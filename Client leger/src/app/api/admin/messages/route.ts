import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer tous les messages
export async function GET(req: NextRequest) {
  console.log("Début de la requête GET pour récupérer les messages (admin)");
  
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
    
    // Récupérer tous les messages
    const messages = await prisma.message.findMany({
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST: Créer un nouveau message
export async function POST(req: NextRequest) {
  console.log("Début de la requête POST pour créer un message");
  
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
    
    // Récupérer les données du message
    const data = await req.json();
    
    // Validation des données
    if (!data.recipientId || !data.content) {
      return NextResponse.json({ 
        error: "Destinataire et contenu du message requis" 
      }, { status: 400 });
    }
    
    // Vérifier si le destinataire existe
    const recipient = await prisma.user.findUnique({
      where: { id: Number(data.recipientId) }
    });
    
    if (!recipient) {
      return NextResponse.json({ error: "Destinataire non trouvé" }, { status: 404 });
    }
    
    // Créer le message
    const newMessage = await prisma.message.create({
      data: {
        subject: data.subject || "Nouveau message",
        content: data.content,
        senderId: Number(userData.id),
        recipientId: Number(data.recipientId),
        isRead: false
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du message:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
