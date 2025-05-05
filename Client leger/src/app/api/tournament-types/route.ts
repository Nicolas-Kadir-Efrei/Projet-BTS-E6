import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Fetch all tournament types
    const types = await prisma.tournamentType.findMany({
      orderBy: {
        type: 'asc',
      },
    });

    return NextResponse.json(types);
  } catch (error) {
    console.error('Error fetching tournament types:', error);
    return NextResponse.json(
      { error: 'Error fetching tournament types' },
      { status: 500 }
    );
  }
}
