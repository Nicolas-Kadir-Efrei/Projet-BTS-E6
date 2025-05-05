import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import NotificationBell from './NotificationBell';

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Tournois
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/tournaments" className="text-gray-600 hover:text-gray-800">
                Liste des tournois
              </Link>
              {user && (
                <Link href="/tournaments/create" className="text-gray-600 hover:text-gray-800">
                  Créer un tournoi
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NotificationBell userId={user.id} />
                <div className="relative group">
                  <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <span>{user.pseudo}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profil
                    </Link>
                    <Link href="/api/auth/signout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Déconnexion
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-800">
                  Connexion
                </Link>
                <Link href="/register" className="text-gray-600 hover:text-gray-800">
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
