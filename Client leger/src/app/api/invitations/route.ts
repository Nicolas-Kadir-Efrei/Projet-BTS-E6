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

    const invitations = await prisma.teamInvitation.findMany({
      where: {
        user_id: session.user.id,
        status: 'PENDING',
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            tag: true,
            logo_url: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(invitations);
  } catch (error: any) {
    console.error('Error fetching invitations:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des invitations' },
      { status: 500 }
    );
  }
}
