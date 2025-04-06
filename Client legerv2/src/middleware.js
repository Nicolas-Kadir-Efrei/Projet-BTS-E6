import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  console.log('Middleware - URL demandée:', request.nextUrl.pathname);
  
  const token = request.cookies.get('token')?.value;
  console.log('Token trouvé:', !!token);

  const user = token ? verifyToken(token) : null;
  console.log('Utilisateur décodé:', user);

  // Vérifier si l'URL commence par /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Tentative d\'accès à une route admin');
    
    if (!user) {
      console.log('Utilisateur non connecté, redirection vers login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!user.isAdmin) {
      console.log('Utilisateur non admin, redirection vers home');
      return NextResponse.redirect(new URL('/home', request.url));
    }

    console.log('Accès admin autorisé');
  }

  // Vérifier si l'URL commence par /home
  if (request.nextUrl.pathname.startsWith('/home')) {
    console.log('Tentative d\'accès à une route protégée');
    
    if (!user) {
      console.log('Utilisateur non connecté, redirection vers login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('Accès autorisé');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/home/:path*']
};
