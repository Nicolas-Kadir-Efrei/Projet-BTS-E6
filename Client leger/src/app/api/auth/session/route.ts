import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  console.log('API Session - Début de la vérification de session');
  try {
    // Vérifier le token dans les headers
    const authHeader = request.headers.get('authorization');
    console.log('API Session - Header d\'autorisation présent:', !!authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('API Session - Token non fourni ou format incorrect');
      return NextResponse.json(
        { error: 'Token non fourni' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('API Session - Token extrait du header');

    // Vérifier et décoder le token
    try {
      const userData = verifyToken(token);
      
      if (!userData) {
        console.log('API Session - Token invalide ou expiré');
        return NextResponse.json(
          { error: 'Token invalide ou expiré' },
          { status: 401 }
        );
      }
      
      console.log('API Session - Token vérifié avec succès, ID utilisateur:', userData.id);
      
      // Récupérer les informations de l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: Number(userData.id) },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          pseudo: true,
        },
      });

      if (!user) {
        console.log('API Session - Utilisateur non trouvé dans la base de données');
        return NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        );
      }

      console.log('API Session - Utilisateur trouvé:', user.email, 'Rôle:', user.role);
      return NextResponse.json(user);
    } catch (tokenError) {
      console.error('API Session - Erreur de vérification du token:', tokenError);
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('API Session - Erreur générale:', error);
    return NextResponse.json(
      { error: 'Session invalide' },
      { status: 401 }
    );
  }
}
