import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  // Vérification des champs obligatoires
  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Veuillez fournir un email et un mot de passe.' }), {
      status: 400,
    });
  }

  try {
    // Rechercher l'utilisateur par email
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Email ou mot de passe incorrect.' }), { status: 401 });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Email ou mot de passe incorrect.' }), { status: 401 });
    }

    // Si tout est correct, l'utilisateur est connecté
    return new Response(JSON.stringify({ message: 'Connexion réussie', user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur serveur', error: error.message }), { status: 500 });
  }
}
