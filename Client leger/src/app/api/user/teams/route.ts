import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  console.log('Début de la requête GET pour récupérer les équipes de l\'utilisateur');
  
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
    
    const userId = Number(userData.id);
    console.log(`Récupération des équipes pour l'utilisateur ID: ${userId}`);
    
    // Récupérer les équipes dont l'utilisateur est membre
    const teamMembers = await prisma.teamMember.findMany({
      where: {
        userId: userId
      },
      include: {
        team: {
          include: {
            tournament: {
              select: {
                tournamentName: true
              }
            },
            members: {
              select: {
                role: true,
                userId: true
              },
              where: {
                userId: userId
              }
            }
          }
        }
      }
    });
    
    // Transformer les données pour n'avoir que les équipes
    const teams = teamMembers.map(member => ({
      id: member.team.id,
      teamName: member.team.teamName,
      tournamentId: member.team.tournamentId,
      tournament: {
        tournamentName: member.team.tournament.tournamentName
      },
      members: member.team.members.map(m => ({
        role: m.role
      }))
    }));
    
    console.log(`${teams.length} équipes récupérées pour l'utilisateur`);
    return NextResponse.json(teams);
    
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
