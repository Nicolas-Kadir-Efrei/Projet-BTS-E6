import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/admin/users/[id] - Récupérer un utilisateur spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Récupérer l'utilisateur spécifique
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      select: {
        id: true,
        email: true,
        name: true,
        pseudo: true,
        role: true,
        createdAt: true,
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'utilisateur' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Mettre à jour un utilisateur
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Vérifier si l'utilisateur à mettre à jour existe
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(params.id) }
    });
    
    if (!existingUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Récupérer les données de mise à jour
    const data = await req.json();
    
    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (data.email && data.email !== existingUser.email) {
      const userWithEmail = await prisma.user.findUnique({
        where: { email: data.email }
      });
      
      if (userWithEmail) {
        return NextResponse.json(
          { error: 'Cet email est déjà utilisé par un autre utilisateur' },
          { status: 400 }
        );
      }
    }
    
    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        email: data.email,
        name: data.name,
        pseudo: data.pseudo,
        role: data.role,
        ...(data.password ? { password: data.password } : {}) // Mettre à jour le mot de passe seulement s'il est fourni
      },
      select: {
        id: true,
        email: true,
        name: true,
        pseudo: true,
        role: true,
        createdAt: true,
      }
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'utilisateur' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Supprimer un utilisateur
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Vérifier si l'utilisateur à supprimer existe
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(params.id) }
    });
    
    if (!existingUser) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Empêcher la suppression de l'utilisateur admin principal
    if (existingUser.email === 'admin@esport-tournois.com') {
      return NextResponse.json(
        { error: 'Impossible de supprimer l\'administrateur principal' },
        { status: 403 }
      );
    }
    
    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id: Number(params.id) }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'utilisateur' },
      { status: 500 }
    );
  }
}
