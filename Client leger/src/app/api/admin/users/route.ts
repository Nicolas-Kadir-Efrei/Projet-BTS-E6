import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/admin/users - Récupérer tous les utilisateurs
export async function GET(req: NextRequest) {
  console.log('GET /api/admin/users - Début de la requête');
  
  // Récupérer le token d'autorisation
  const authHeader = req.headers.get('authorization');
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
    const userData = verifyToken(token);
    console.log('Token vérifié, données utilisateur:', userData ? 'Données présentes' : 'Données absentes');
    
    if (!userData || !userData.id) {
      console.log('Erreur: Token invalide ou expiré');
      return NextResponse.json({ error: "Unauthorized - Token invalide ou expiré" }, { status: 401 });
    }
    
    // Vérifier si l'utilisateur est un admin
    console.log('Vérification du rôle admin pour l\'utilisateur ID:', userData.id);
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true, email: true }
    });
    
    console.log('Utilisateur trouvé:', user ? `Email: ${user.email}, Rôle: ${user.role}` : 'Non trouvé');
    
    if (!user) {
      console.log('Erreur: Utilisateur non trouvé dans la base de données');
      return NextResponse.json({ error: "Unauthorized - Utilisateur non trouvé" }, { status: 401 });
    }
    
    if (user.role !== 'admin') {
      console.log('Erreur: L\'utilisateur n\'est pas un administrateur');
      return NextResponse.json({ error: "Forbidden - Accès réservé aux administrateurs" }, { status: 403 });
    }
    
    // Récupérer tous les utilisateurs
    console.log('Récupération de la liste des utilisateurs...');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        pseudo: true,
        role: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    
    console.log(`${users.length} utilisateurs récupérés avec succès`);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Créer un nouvel utilisateur
export async function POST(req: NextRequest) {
  // Récupérer le token d'autorisation
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  
  try {
    // Vérifier et décoder le token
    const userData = verifyToken(token);
    
    if (!userData || !userData.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Vérifier si l'utilisateur est un admin
    const admin = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Récupérer les données du nouvel utilisateur
    const data = await req.json();
    
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
      );
    }
    
    // Créer le nouvel utilisateur
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        pseudo: data.pseudo,
        password: data.password, // Idéalement, il faudrait hasher le mot de passe
        role: data.role || 'user',
        last_name: data.last_name || '',
        sexe: data.sexe || '',
        birthday: data.birthday ? new Date(data.birthday) : new Date(),
        last_auth: new Date()
      }
    });
    
    return NextResponse.json(
      { 
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        pseudo: newUser.pseudo,
        role: newUser.role,
        created_at: newUser.created_at
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'utilisateur' },
      { status: 500 }
    );
  }
}
