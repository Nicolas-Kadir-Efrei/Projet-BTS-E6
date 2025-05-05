'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('visitor' | 'user' | 'admin')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Rediriger vers la page appropriée selon le rôle
      switch (user.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'user':
          router.push('/dashboard');
          break;
        default:
          router.push('/');
      }
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  // Si l'utilisateur n'est pas authentifié ou n'a pas le bon rôle, ne rien afficher
  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
