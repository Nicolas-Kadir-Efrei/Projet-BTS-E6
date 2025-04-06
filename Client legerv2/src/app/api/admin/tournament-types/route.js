import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRole } from '@/lib/auth';

// Récupérer tous les types de tournois
export async function GET() {
  try {
    await checkRole('admin');

    const types = await prisma.tournament_types.findMany({
      orderBy: {
        type: 'asc'
      }
    });

    return NextResponse.json(types);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}

// Créer un nouveau type de tournoi
export async function POST(request) {
  try {
    await checkRole('admin');
    
    const { type } = await request.json();

    // Vérifier si le type existe déjà
    const existingType = await prisma.tournament_types.findFirst({
      where: { type }
    });

    if (existingType) {
      return NextResponse.json(
        { message: 'Ce type de tournoi existe déjà' },
        { status: 400 }
      );
    }

    const tournamentType = await prisma.tournament_types.create({
      data: { type }
    });

    return NextResponse.json(tournamentType);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}

// Mettre à jour un type de tournoi
export async function PATCH(request) {
  try {
    await checkRole('admin');
    
    const { id, type } = await request.json();

    // Vérifier si le nouveau type est déjà utilisé
    const existingType = await prisma.tournament_types.findFirst({
      where: {
        type,
        NOT: {
          id: parseInt(id)
        }
      }
    });

    if (existingType) {
      return NextResponse.json(
        { message: 'Ce type de tournoi est déjà utilisé' },
        { status: 400 }
      );
    }

    const tournamentType = await prisma.tournament_types.update({
      where: { id: parseInt(id) },
      data: { type }
    });

    return NextResponse.json(tournamentType);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}

// Supprimer un type de tournoi
export async function DELETE(request) {
  try {
    await checkRole('admin');
    
    const { id } = await request.json();

    // Vérifier si le type est utilisé dans des tournois
    const tournamentsUsingType = await prisma.tournament.count({
      where: { tournament_typesId: parseInt(id) }
    });

    if (tournamentsUsingType > 0) {
      return NextResponse.json(
        { message: 'Ce type de tournoi est utilisé et ne peut pas être supprimé' },
        { status: 400 }
      );
    }

    await prisma.tournament_types.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Type de tournoi supprimé avec succès' });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message === 'Non authentifié' ? 401 : 
               error.message === 'Accès non autorisé' ? 403 : 500 }
    );
  }
}
