'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Tournament {
  id: number;
  tournamentName: string;
}

export default function CreateTeamPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [maxMembers, setMaxMembers] = useState(5);
  const [tournamentId, setTournamentId] = useState('');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/tournaments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des tournois');
      }

      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue lors du chargement des tournois');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          teamName,
          description,
          maxMembers: Number(maxMembers),
          tournamentId: Number(tournamentId)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la création de l\'équipe');
      }

      setSuccess('Équipe créée avec succès');
      // Réinitialiser le formulaire
      setTeamName('');
      setDescription('');
      setMaxMembers(5);
      setTournamentId('');
      
      // Rediriger vers la liste des équipes après 2 secondes
      setTimeout(() => {
        router.push('/admin/teams');
      }, 2000);
    } catch (error: any) {
      console.error('Erreur:', error);
      setError(error.message || 'Une erreur est survenue lors de la création de l\'équipe');
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
          <h1 className="text-2xl font-bold">Créer une nouvelle équipe</h1>
          <Link
            href="/admin/teams"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Retour
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'équipe *
            </label>
            <input
              type="text"
              id="teamName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre maximum de membres *
            </label>
            <input
              type="number"
              id="maxMembers"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={maxMembers}
              onChange={(e) => setMaxMembers(Number(e.target.value))}
              min={1}
              max={20}
              required
            />
          </div>

          <div>
            <label htmlFor="tournamentId" className="block text-sm font-medium text-gray-700 mb-1">
              Tournoi *
            </label>
            <select
              id="tournamentId"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tournamentId}
              onChange={(e) => setTournamentId(e.target.value)}
              required
            >
              <option value="">Sélectionner un tournoi</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.tournamentName}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Création en cours...
                </span>
              ) : (
                'Créer l\'équipe'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
