'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserNavbar from '@/components/ui/UserNavbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    tournamentName: '',
    gameId: '',
    tournament_typeId: '',
    startDate: '',
    startTime: '',
    format: '',
    rules: '',
    maxParticipants: '0',
    minTeams: '0',
    playersPerTeam: '0',
    rewards: ''
  });
  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch games
        const gamesRes = await fetch('/api/games', { headers });
        const gamesData = await gamesRes.json();
        setGames(gamesData);

        // Fetch tournament types
        const typesRes = await fetch('/api/tournament-types', { headers });
        const typesData = await typesRes.json();
        setTournamentTypes(typesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load required data');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Calculer le nombre total de participants
      const minTeams = parseInt(formData.minTeams);
      const playersPerTeam = parseInt(formData.playersPerTeam);
      const totalPlayers = minTeams * playersPerTeam;
      
      const token = localStorage.getItem('token');
      const res = await fetch('/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          gameId: parseInt(formData.gameId),
          tournament_typeId: parseInt(formData.tournament_typeId),
          maxParticipants: totalPlayers,
          minTeams: parseInt(formData.minTeams),
          playersPerTeam: parseInt(formData.playersPerTeam),
          totalPlayers: totalPlayers
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create tournament');
      }

      router.push('/tournaments');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Tournament</h1>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Tournament Name"
                type="text"
                required
                value={formData.tournamentName}
                onChange={(e) => setFormData({ ...formData, tournamentName: e.target.value })}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Game
                  </label>
                  <select
                    required
                    value={formData.gameId}
                    onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a game</option>
                    {games.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tournament Type
                  </label>
                  <select
                    required
                    value={formData.tournament_typeId}
                    onChange={(e) => setFormData({ ...formData, tournament_typeId: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a type</option>
                    {tournamentTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.type}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Start Date"
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />

                <Input
                  label="Start Time"
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />

                <Input
                  label="Format"
                  type="text"
                  required
                  placeholder="e.g., Single Elimination, Round Robin"
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Participants (calculé automatiquement)
                  </label>
                  <input
                    type="number"
                    required
                    readOnly
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black bg-gray-100"
                    value={formData.maxParticipants}
                  />
                  <p className="text-xs text-gray-500 mt-1">Calculé à partir du nombre d'équipes et de joueurs par équipe</p>
                </div>

                <Input
                  label="Minimum Teams"
                  type="number"
                  required
                  min="2"
                  value={formData.minTeams}
                  onChange={(e) => setFormData({ ...formData, minTeams: e.target.value })}
                />

                <Input
                  label="Players per Team"
                  type="number"
                  required
                  min="1"
                  value={formData.playersPerTeam}
                  onChange={(e) => setFormData({ ...formData, playersPerTeam: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rules
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.rules}
                  onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter tournament rules and guidelines..."
                />
              </div>

              <Input
                label="Rewards"
                type="text"
                placeholder="e.g., Prize pool, trophies"
                value={formData.rewards}
                onChange={(e) => setFormData({ ...formData, rewards: e.target.value })}
              />

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Tournament'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
