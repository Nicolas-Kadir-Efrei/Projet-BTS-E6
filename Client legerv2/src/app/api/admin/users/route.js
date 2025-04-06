import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRole } from '@/lib/auth';

// Récupérer tous les utilisateurs
export async function GET() {
  try {
    await checkRole('admin');

    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        pseudo: true,
        name: true,
        last_name: true,
        role: true,
        created_at: true,
        last_auth: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}

// Mettre à jour le rôle d'un utilisateur
export async function PATCH(request) {
  try {
    await checkRole('admin');
    
    const { userId, role } = await request.json();

    // Vérifier que le rôle est valide
    if (!['admin', 'user'].includes(role)) {
      return NextResponse.json(
        { message: 'Rôle invalide' },
        { status: 400 }
      );
    }

    const user = await prisma.users.update({
      where: { id: parseInt(userId) },
      data: { role },
      select: {
        id: true,
        email: true,
        pseudo: true,
        role: true
      }
    });

    return NextResponse.json({
      message: 'Rôle mis à jour avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error);
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}
