'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function UserNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/tournaments" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">ESport Tournaments</span>
            </Link>
            
            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="/tournaments"
                  className={`${
                    isActive('/tournaments')
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Tournaments
                </Link>
                <Link
                  href="/tournaments/create"
                  className={`${
                    isActive('/tournaments/create')
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Create Tournament
                </Link>
                
                {/* Teams Dropdown */}
                <div className="relative">
                  <button
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium inline-flex items-center"
                    onClick={() => setIsTeamMenuOpen(!isTeamMenuOpen)}
                  >
                    Teams
                    <svg
                      className={`ml-2 h-4 w-4 transition-transform ${isTeamMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Teams Dropdown Menu */}
                  {isTeamMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/teams"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          All Teams
                        </Link>
                        <Link
                          href="/teams/my-team"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Team
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/tournaments"
              className={`${
                isActive('/tournaments')
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } block rounded-md px-3 py-2 text-base font-medium`}
            >
              Tournaments
            </Link>
            <Link
              href="/tournaments/create"
              className={`${
                isActive('/tournaments/create')
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } block rounded-md px-3 py-2 text-base font-medium`}
            >
              Create Tournament
            </Link>
            <Link
              href="/teams"
              className={`${
                isActive('/teams')
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } block rounded-md px-3 py-2 text-base font-medium`}
            >
              All Teams
            </Link>
            <Link
              href="/teams/my-team"
              className={`${
                isActive('/teams/my-team')
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } block rounded-md px-3 py-2 text-base font-medium`}
            >
              My Team
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left rounded-md px-3 py-2 text-base font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
