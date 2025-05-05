import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer un message spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête GET pour récupérer le message ${params.id}`);
  
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
    
    const messageId = parseInt(params.id);
    
    if (isNaN(messageId)) {
      return NextResponse.json({ error: "ID de message invalide" }, { status: 400 });
    }
    
    // Récupérer le message
    const message = await prisma.message.findUnique({
      where: { id: messageId },
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
    
    if (!message) {
      return NextResponse.json({ error: "Message non trouvé" }, { status: 404 });
    }
    
    // Si l'utilisateur est le destinataire et que le message n'est pas lu, le marquer comme lu
    if (message.recipientId === Number(userData.id) && !message.isRead) {
      await prisma.message.update({
        where: { id: messageId },
        data: { isRead: true }
      });
    }
    
    return NextResponse.json(message);
  } catch (error) {
    console.error("Erreur lors de la récupération du message:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE: Supprimer un message
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête DELETE pour supprimer le message ${params.id}`);
  
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
    
    const messageId = parseInt(params.id);
    
    if (isNaN(messageId)) {
      return NextResponse.json({ error: "ID de message invalide" }, { status: 400 });
    }
    
    // Vérifier si le message existe
    const message = await prisma.message.findUnique({
      where: { id: messageId }
    });
    
    if (!message) {
      return NextResponse.json({ error: "Message non trouvé" }, { status: 404 });
    }
    
    // Supprimer le message
    await prisma.message.delete({
      where: { id: messageId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PATCH: Mettre à jour un message (marquer comme lu)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Début de la requête PATCH pour mettre à jour le message ${params.id}`);
  
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
    
    const messageId = parseInt(params.id);
    
    if (isNaN(messageId)) {
      return NextResponse.json({ error: "ID de message invalide" }, { status: 400 });
    }
    
    // Vérifier si le message existe
    const message = await prisma.message.findUnique({
      where: { id: messageId }
    });
    
    if (!message) {
      return NextResponse.json({ error: "Message non trouvé" }, { status: 404 });
    }
    
    // Récupérer les données de mise à jour
    const data = await req.json();
    
    // Mettre à jour le message
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        isRead: data.isRead !== undefined ? data.isRead : message.isRead
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
    
    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du message:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
