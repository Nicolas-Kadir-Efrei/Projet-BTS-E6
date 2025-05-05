import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: 'Le terme de recherche doit contenir au moins 3 caractères' },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
        NOT: {
          id: session.user.id, // Exclure l'utilisateur actuel
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
      take: 10, // Limiter à 10 résultats
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Error searching users:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la recherche des utilisateurs' },
      { status: 500 }
    );
  }
}
