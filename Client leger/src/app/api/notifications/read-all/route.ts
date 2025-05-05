import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function PATCH(req: NextRequest) {
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
    
    // Marquer toutes les notifications comme lues
    const result = await prisma.notification.updateMany({
      where: { 
        userId,
        isRead: false
      },
      data: { isRead: true }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `${result.count} notifications marquées comme lues`,
      count: result.count
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des notifications:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des notifications' },
      { status: 500 }
    );
  }
}
