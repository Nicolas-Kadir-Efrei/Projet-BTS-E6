import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

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
    
    // Compter les notifications non lues
    const count = await prisma.notification.count({
      where: { 
        userId,
        isRead: false
      }
    });
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Erreur lors du comptage des notifications non lues:', error);
    return NextResponse.json(
      { error: 'Erreur lors du comptage des notifications' },
      { status: 500 }
    );
  }
}
