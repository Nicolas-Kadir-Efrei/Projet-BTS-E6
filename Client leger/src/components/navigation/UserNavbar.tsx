'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">Logo</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-black hover:text-black"
              >
                Dashboard
              </Link>
              <Link 
                href="/tournaments"
                className="inline-flex items-center px-1 pt-1 text-black hover:text-black"
              >
                Tournois
              </Link>
              <Link 
                href="/teams"
                className="inline-flex items-center px-1 pt-1 text-black hover:text-black"
              >
                Équipes
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <span className="text-black">{user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-black hover:text-black"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
