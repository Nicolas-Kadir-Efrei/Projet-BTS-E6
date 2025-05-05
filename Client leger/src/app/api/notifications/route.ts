import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/notifications
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
    
    const userId = Number(userData.id);

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des notifications' },
      { status: 500 }
    );
  }
}

// POST /api/notifications
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
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, type, title, message, data } = body;

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la notification' },
      { status: 500 }
    );
  }
}
