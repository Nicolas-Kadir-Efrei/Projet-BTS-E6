'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SimpleTournamentsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas un admin
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
      return;
    }
    
    if (!authLoading && user && user.role === 'admin') {
      fetchTournaments();
    }
  }, [authLoading, user, router]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      console.log('Chargement des tournois...');
      
      // Récupérer le token depuis localStorage
      let token = '';
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token') || '';
        console.log('Token récupéré:', token ? 'Token présent' : 'Token absent');
      }
      
      if (!token) {
        console.error('Aucun token d\'authentification trouvé');
        setError('Vous devez être connecté pour accéder à cette page');
        setLoading(false);
        return;
      }
      
      // Utiliser une requête SQL directe via une API simplifiée
      const response = await fetch('/api/admin/simple-tournaments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
      });

      console.log('Statut de la réponse tournaments:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Erreur ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Erreur API tournaments:', errorData);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Impossible de parser l\'erreur JSON');
        }
        throw new Error(`Erreur lors du chargement des tournois: ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Données tournois reçues:', data);
      setTournaments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des tournois:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors du chargement des tournois');
    } finally {
      setLoading(false);
    }
  };

  // Afficher un indicateur de chargement pendant l'authentification
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Ne rien afficher si l'utilisateur n'est pas un admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Tournois (Vue Simplifiée)</h1>
          <Link
            href="/admin/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retour au Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jeu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tournaments.length > 0 ? (
                  tournaments.map((tournament) => (
                    <tr key={tournament.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tournament.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tournament.tournamentName || tournament.name || "Sans nom"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tournament.game?.name || "Jeu inconnu"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : "Date non définie"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/tournaments/${tournament.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Voir
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Aucun tournoi trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
