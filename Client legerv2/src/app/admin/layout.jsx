'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-white shadow-sm mb-8">
          <div className="container mx-auto">
            <div className="flex items-center space-x-8 h-16">
              <h2 className="text-xl font-semibold">Administration</h2>
              <nav className="flex space-x-4">
                <a href="/admin" className="text-gray-600 hover:text-gray-900">
                  Tableau de bord
                </a>
                <a href="/admin/users" className="text-gray-600 hover:text-gray-900">
                  Utilisateurs
                </a>
                <a href="/admin/games" className="text-gray-600 hover:text-gray-900">
                  Jeux
                </a>
                <a href="/admin/tournament-types" className="text-gray-600 hover:text-gray-900">
                  Types de tournois
                </a>
              </nav>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
