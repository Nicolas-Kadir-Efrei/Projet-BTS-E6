import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Données reçues:', body);

    const { email, password, pseudo, name, last_name } = body;

    // Vérification des champs requis
    if (!email || !password || !pseudo || !name || !last_name) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { pseudo }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email ou pseudo déjà utilisé' },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        pseudo,
        name,
        last_name,
        created_at: new Date(),
      }
    });

    console.log('Utilisateur créé:', user);

    // Générer le token avec les données minimales
    const token = generateToken({
      id: user.id,
      email: user.email
    });

    // Créer la réponse
    const response = NextResponse.json({
      message: 'Inscription réussie',
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        name: user.name,
        last_name: user.last_name
      }
    });

    // Ajouter le token dans les cookies
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
    });

    return response;

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
