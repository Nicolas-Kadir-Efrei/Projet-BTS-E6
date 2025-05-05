'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface Game {
  id: number;
  name: string;
}

interface TournamentType {
  id: number;
  type: string;
}

export default function CreateTournamentPage() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [tournamentTypes, setTournamentTypes] = useState<TournamentType[]>([]);
  const [formData, setFormData] = useState({
    tournamentName: '',
    gameId: '',
    tournament_typeId: '',
    startDate: '',
    startTime: '',
    format: '',
    rules: '',
    minTeams: '0',
    playersPerTeam: '0',
    maxParticipants: '0', // Sera calculé automatiquement
    rewards: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Calculer automatiquement le nombre maximum de participants
  useEffect(() => {
    if (formData.minTeams && formData.playersPerTeam) {
      const minTeams = parseInt(formData.minTeams);
      const playersPerTeam = parseInt(formData.playersPerTeam);
      
      if (!isNaN(minTeams) && !isNaN(playersPerTeam)) {
        const totalPlayers = minTeams * playersPerTeam;
        setFormData(prev => ({
          ...prev,
          maxParticipants: totalPlayers.toString()
        }));
      }
    }
  }, [formData.minTeams, formData.playersPerTeam]);
  
  // Charger les jeux et les types de tournois
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Récupérer les jeux
        const gamesRes = await fetch('/api/games', { headers });
        const gamesData = await gamesRes.json();
        setGames(gamesData);

        // Récupérer les types de tournois
        const typesRes = await fetch('/api/tournament-types', { headers });
        const typesData = await typesRes.json();
        setTournamentTypes(typesData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données nécessaires');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Calculer le nombre total de participants
      const minTeams = parseInt(formData.minTeams);
      const playersPerTeam = parseInt(formData.playersPerTeam);
      const totalPlayers = minTeams * playersPerTeam;
      
      const res = await fetch('/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          gameId: parseInt(formData.gameId),
          tournament_typeId: parseInt(formData.tournament_typeId),
          minTeams: parseInt(formData.minTeams),
          playersPerTeam: parseInt(formData.playersPerTeam),
          maxParticipants: totalPlayers,
          totalPlayers: totalPlayers
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      router.push('/admin/tournaments');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Créer un Tournoi</h1>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du tournoi
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.tournamentName}
                  onChange={(e) => setFormData({ ...formData, tournamentName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jeu
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.gameId}
                  onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                >
                  <option value="">Sélectionnez un jeu</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de tournoi
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.tournament_typeId}
                  onChange={(e) => setFormData({ ...formData, tournament_typeId: e.target.value })}
                >
                  <option value="">Sélectionnez un type</option>
                  {tournamentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de début
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: BO3, Double élimination"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'équipes minimum
                </label>
                <input
                  type="number"
                  required
                  min="2"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.minTeams}
                  onChange={(e) => setFormData({ ...formData, minTeams: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joueurs par équipe
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.playersPerTeam}
                  onChange={(e) => setFormData({ ...formData, playersPerTeam: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre maximum de participants (calculé automatiquement)
                </label>
                <input
                  type="number"
                  required
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black"
                  value={formData.maxParticipants}
                />
                <p className="text-xs text-gray-500 mt-1">Calculé à partir du nombre d'équipes et de joueurs par équipe</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Récompenses
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.rewards}
                  onChange={(e) => setFormData({ ...formData, rewards: e.target.value })}
                  placeholder="ex: 1000€, trophées, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Règlement
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                value={formData.rules}
                onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                placeholder="Détaillez les règles du tournoi..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Création...' : 'Créer le tournoi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
