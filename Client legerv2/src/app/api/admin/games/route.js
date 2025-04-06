import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRole } from '@/lib/auth';

// Récupérer tous les jeux
export async function GET() {
  try {
    await checkRole('admin');

    const games = await prisma.game.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}

// Créer un nouveau jeu
export async function POST(request) {
  try {
    await checkRole('admin');
    
    const { name } = await request.json();

    // Vérifier si le jeu existe déjà
    const existingGame = await prisma.game.findFirst({
      where: { name }
    });

    if (existingGame) {
      return NextResponse.json(
        { message: 'Ce jeu existe déjà' },
        { status: 400 }
      );
    }

    const game = await prisma.game.create({
      data: { name }
    });

    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}

// Mettre à jour un jeu
export async function PATCH(request) {
  try {
    await checkRole('admin');
    
    const { id, name } = await request.json();

    // Vérifier si le nouveau nom est déjà utilisé
    const existingGame = await prisma.game.findFirst({
      where: {
        name,
        NOT: {
          id: parseInt(id)
        }
      }
    });

    if (existingGame) {
      return NextResponse.json(
        { message: 'Ce nom de jeu est déjà utilisé' },
        { status: 400 }
      );
    }

    const game = await prisma.game.update({
      where: { id: parseInt(id) },
      data: { name }
    });

    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}

// Supprimer un jeu
export async function DELETE(request) {
  try {
    await checkRole('admin');
    
    const { id } = await request.json();

    // Vérifier si le jeu est utilisé dans des tournois
    const tournamentsUsingGame = await prisma.tournament.count({
      where: { gameId: parseInt(id) }
    });

    if (tournamentsUsingGame > 0) {
      return NextResponse.json(
        { message: 'Ce jeu est utilisé dans des tournois et ne peut pas être supprimé' },
        { status: 400 }
      );
    }

    await prisma.game.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Jeu supprimé avec succès' });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}
