'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TeamMember {
  id: number;
  userId: number;
  teamId: number;
  role: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    pseudo: string | null;
  };
}

interface Team {
  id: number;
  teamName: string;
  description: string | null;
  maxMembers: number;
  tournamentId: number;
  createdAt: string;
  members: TeamMember[];
  tournament: {
    id: number;
    tournamentName: string;
  };
}

export default function TeamsManagementPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas un admin
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
      return;
    }
    
    if (!authLoading && user && user.role === 'admin') {
      fetchTeams();
    }
  }, [authLoading, user, router]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      console.log('Chargement des équipes...');
      const token = localStorage.getItem('token');
      console.log('Token récupéré:', token ? 'Token présent' : 'Token absent');
      
      const response = await fetch('/api/admin/teams', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Statut de la réponse:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erreur API:', errorData);
        throw new Error(`Erreur lors du chargement des équipes: ${response.status}`);
      }

      const data = await response.json();
      console.log('Données reçues:', data);
      setTeams(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue lors du chargement des équipes');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team => 
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.tournament.tournamentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold">Gestion des Équipes</h1>
          <Link
            href="/admin/teams/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Nouvelle Équipe
          </Link>
        </div>

        {/* Filtres */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher par nom d'équipe ou de tournoi..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tableau des équipes */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Équipe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tournoi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{team.teamName}</div>
                        <div className="text-sm text-gray-500">
                          {team.description ? team.description.substring(0, 50) + (team.description.length > 50 ? '...' : '') : 'Pas de description'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{team.tournament.tournamentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{team.members.length} / {team.maxMembers}</div>
                        <div className="text-xs text-gray-500">
                          {team.members.map(member => member.user.pseudo || member.user.name || member.user.email).join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/teams/${team.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`/admin/teams/${team.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={async () => {
                            if (window.confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
                              try {
                                const token = localStorage.getItem('token');
                                const response = await fetch(`/api/admin/teams/${team.id}`, {
                                  method: 'DELETE',
                                  headers: {
                                    Authorization: `Bearer ${token}`
                                  }
                                });
                                
                                if (response.ok) {
                                  // Rafraîchir la liste après suppression
                                  fetchTeams();
                                } else {
                                  const data = await response.json();
                                  alert(data.error || 'Erreur lors de la suppression');
                                }
                              } catch (error) {
                                console.error('Erreur:', error);
                                alert('Une erreur est survenue lors de la suppression');
                              }
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      Aucune équipe trouvée
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
