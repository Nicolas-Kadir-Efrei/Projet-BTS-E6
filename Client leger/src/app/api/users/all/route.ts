import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  console.log('Début de la requête GET pour récupérer tous les utilisateurs');
  
  // Récupérer le token d'autorisation
  const authHeader = request.headers.get('authorization');
  console.log('Header d\'autorisation présent:', !!authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Erreur: Token d\'autorisation manquant ou mal formaté');
    return NextResponse.json({ error: "Unauthorized - Token manquant ou mal formaté" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  console.log('Token extrait du header');
  
  try {
    // Vérifier et décoder le token
    console.log('Vérification du token...');
    const userData = await verifyToken(token);
    console.log('Token vérifié, données utilisateur:', userData ? 'Données présentes' : 'Données absentes');
    
    if (!userData || !userData.id) {
      console.log('Erreur: Token invalide ou expiré');
      return NextResponse.json({ error: "Unauthorized - Token invalide ou expiré" }, { status: 401 });
    }
    
    // Récupérer tous les utilisateurs (sauf l'utilisateur actuel)
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: Number(userData.id) // Exclure l'utilisateur actuel
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        pseudo: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    // Transformer les données pour la réponse
    const formattedUsers = users.map(user => ({
      id: user.id.toString(),
      name: user.name || user.pseudo,
      email: user.email
    }));
    
    console.log(`${formattedUsers.length} utilisateurs récupérés`);
    return NextResponse.json(formattedUsers);
    
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
