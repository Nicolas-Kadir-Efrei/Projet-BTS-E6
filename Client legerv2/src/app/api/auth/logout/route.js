import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Déconnexion réussie' });
  
  // Supprimer le cookie de token
  response.cookies.delete('token');
  
  return response;
}
