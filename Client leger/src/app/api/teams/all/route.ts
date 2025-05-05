import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// Interface pour l'utilisateur authentifié
interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token d'autorisation
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour voir les équipes' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7); // Enlever 'Bearer '
    const userData = await verifyToken(token);
    
    if (!userData) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 401 }
      );
    }

    // Récupérer toutes les équipes avec leurs membres
    const teams = await prisma.team.findMany({
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Transformer les données pour correspondre à l'interface attendue par le frontend
    const transformedTeams = teams.map(team => {
      // Utiliser l'URL du logo de la base de données ou une image par défaut si elle n'existe pas
      // Utiliser une assertion de type pour accéder à logo_url qui peut ne pas être dans le type
      const teamAny = team as any;
      const logoUrl = teamAny.logo_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(team.teamName)}&backgroundColor=b6e3f4&radius=50`;
      
      return {
        id: team.id.toString(),
        name: team.teamName, // Utiliser teamName comme name pour le frontend
        tag: '', // Champ non existant dans la base de données, mais attendu par le frontend
        logo_url: logoUrl,
        description: '', // Champ non existant dans la base de données, mais attendu par le frontend
        createdAt: team.createdAt.toISOString(),
        members: team.members.map(member => ({
          id: member.user.id.toString(),
          name: member.user.name,
          email: member.user.email,
          role: member.role,
        })),
        isOwner: team.members.some(
          member => member.user.id === Number(userData.id) && member.role === 'CAPTAIN'
        ),
      };
    });

    return NextResponse.json(transformedTeams);
  } catch (error: any) {
    console.error('Error fetching all teams:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des équipes' },
      { status: 500 }
    );
  }
}
