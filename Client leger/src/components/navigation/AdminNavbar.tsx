'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin/dashboard" className="text-xl font-bold text-blue-600">
                Administration
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/admin/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/admin/dashboard')
                    ? 'border-blue-500 text-black'
                    : 'border-transparent text-black hover:border-gray-300'
                }`}
              >
                Tableau de bord
              </Link>
              <Link
                href="/admin/tournaments"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/admin/tournaments')
                    ? 'border-blue-500 text-black'
                    : 'border-transparent text-black hover:border-gray-300'
                }`}
              >
                Tournois
              </Link>
              <Link
                href="/admin/users"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/admin/users')
                    ? 'border-blue-500 text-black'
                    : 'border-transparent text-black hover:border-gray-300'
                }`}
              >
                Utilisateurs
              </Link>
              <Link
                href="/admin/contacts"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/admin/contacts')
                    ? 'border-blue-500 text-black'
                    : 'border-transparent text-black hover:border-gray-300'
                }`}
              >
                Contacts
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center space-x-4">
                <span className="text-black">
                  {user?.email}
                </span>
                <button
                  onClick={() => logout()}
                  className="text-black hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/admin/dashboard"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/admin/dashboard')
                  ? 'bg-blue-50 border-blue-500 text-black'
                  : 'border-transparent text-black hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              href="/admin/tournaments"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/admin/tournaments')
                  ? 'bg-blue-50 border-blue-500 text-black'
                  : 'border-transparent text-black hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              Tournois
            </Link>
            <Link
              href="/admin/users"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/admin/users')
                  ? 'bg-blue-50 border-blue-500 text-black'
                  : 'border-transparent text-black hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              Utilisateurs
            </Link>
            <Link
              href="/admin/contacts"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/admin/contacts')
                  ? 'bg-blue-50 border-blue-500 text-black'
                  : 'border-transparent text-black hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              Contacts
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 space-y-1">
              <div className="px-4 py-2 text-black">
                {user?.email}
              </div>
              <button
                onClick={() => logout()}
                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-50"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
