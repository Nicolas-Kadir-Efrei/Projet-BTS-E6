import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// PATCH /api/admin/contacts/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('Début de la requête PATCH pour mettre à jour le contact ID:', params.id);
  
  // Récupérer le token d'autorisation
  const authHeader = request.headers.get('authorization');
  console.log('Header d\'autorisation présent:', !!authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Erreur: Token d\'autorisation manquant ou mal formaté');
    return NextResponse.json({ error: "Unauthorized - Token manquant ou mal formaté" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  
  try {
    // Vérifier et décoder le token
    const userData = await verifyToken(token);
    
    if (!userData || !userData.id) {
      console.log('Erreur: Token invalide ou expiré');
      return NextResponse.json({ error: "Unauthorized - Token invalide ou expiré" }, { status: 401 });
    }
    
    // Vérifier si l'utilisateur est un admin
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!user) {
      console.log('Erreur: Utilisateur non trouvé dans la base de données');
      return NextResponse.json({ error: "Unauthorized - Utilisateur non trouvé" }, { status: 401 });
    }
    
    if (user.role !== 'admin') {
      console.log('Erreur: L\'utilisateur n\'est pas un administrateur');
      return NextResponse.json({ error: "Forbidden - Accès réservé aux administrateurs" }, { status: 403 });
    }
    
    // Traiter la requête
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Le statut est requis' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/contacts/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('Début de la requête DELETE pour supprimer le contact ID:', params.id);
  
  // Récupérer le token d'autorisation
  const authHeader = request.headers.get('authorization');
  console.log('Header d\'autorisation présent:', !!authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Erreur: Token d\'autorisation manquant ou mal formaté');
    return NextResponse.json({ error: "Unauthorized - Token manquant ou mal formaté" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  
  try {
    // Vérifier et décoder le token
    const userData = await verifyToken(token);
    
    if (!userData || !userData.id) {
      console.log('Erreur: Token invalide ou expiré');
      return NextResponse.json({ error: "Unauthorized - Token invalide ou expiré" }, { status: 401 });
    }
    
    // Vérifier si l'utilisateur est un admin
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!user) {
      console.log('Erreur: Utilisateur non trouvé dans la base de données');
      return NextResponse.json({ error: "Unauthorized - Utilisateur non trouvé" }, { status: 401 });
    }
    
    if (user.role !== 'admin') {
      console.log('Erreur: L\'utilisateur n\'est pas un administrateur');
      return NextResponse.json({ error: "Forbidden - Accès réservé aux administrateurs" }, { status: 403 });
    }
    
    // Supprimer le contact
    await prisma.contact.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Erreur lors de la suppression du contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
