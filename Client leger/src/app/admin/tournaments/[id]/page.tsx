'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface Tournament {
  id: number;
  name: string;
  type: string;
  status: string;
  startDate: string;
  startTime: string;
  description?: string;
  rules?: string;
  prizes?: string;
  participantsCount: number;
  maxParticipants: number;
  participants: { id: number; name: string }[];
  pendingRequests: { id: number; userId: number; name: string; requestDate: string }[];
  game: {
    id: number;
    name: string;
    image_path?: string;
  };
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
}

export default function TournamentDetailsPage({ params }: { params: { id: string } }) {
  // Déballer les params avec React.use()
  const resolvedParams = React.use(params) as { id: string };
  const tournamentId = resolvedParams.id;
  
  const { user, isAuthenticated } = useAuth();
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification
    if (isAuthenticated) {
      setAuthLoading(false);
      
      // Rediriger si l'utilisateur n'est pas un admin
      if (user && user.role !== 'admin') {
        router.push('/login');
        return;
      }
      
      // Si l'utilisateur est admin, charger les données du tournoi
      if (user && user.role === 'admin') {
        fetchTournament();
      }
    } else if (isAuthenticated === false) {
      // Si l'utilisateur n'est pas authentifié, rediriger
      setAuthLoading(false);
      router.push('/login');
    }
  }, [isAuthenticated, user, router, tournamentId]);

  const fetchTournament = async () => {
    try {
      setLoading(true);
      console.log(`Chargement des détails du tournoi ${tournamentId}...`);
      
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token') || '';
      
      if (!token) {
        setError('Vous devez être connecté pour accéder à cette page');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`/api/admin/tournaments/${tournamentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Données du tournoi reçues:', data);
      setTournament(data);
    } catch (error) {
      console.error('Erreur lors du chargement du tournoi:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTournament = async () => {
    try {
      setDeleteLoading(true);
      
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token') || '';
      
      if (!token) {
        setError('Vous devez être connecté pour effectuer cette action');
        setDeleteLoading(false);
        return;
      }
      
      const response = await fetch(`/api/admin/tournaments/${tournamentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur ${response.status}`);
      }
      
      // Rediriger vers la liste des tournois après suppression
      router.push('/admin/tournaments');
    } catch (error) {
      console.error('Erreur lors de la suppression du tournoi:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la suppression');
      setShowDeleteModal(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Afficher un indicateur de chargement pendant l'authentification
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Afficher une erreur si nécessaire
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <div className="mt-4">
                <Link href="/admin/tournaments" className="text-sm font-medium text-red-700 hover:text-red-600">
                  Retour à la liste des tournois
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Ne rien afficher si l'utilisateur n'est pas un admin
  if (!user || user.role !== 'admin' || !tournament) {
    return null;
  }

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* En-tête avec actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{tournament.name}</h1>
          <div className="flex space-x-3">
            <Link
              href={`/admin/tournaments/${params.id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Modifier
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Supprimer
            </button>
            <Link
              href="/admin/tournaments"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Retour
            </Link>
          </div>
        </div>
        
        {/* Informations principales */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Informations générales</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Type de tournoi</p>
                    <p className="font-medium">{tournament.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <p className="font-medium">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        tournament.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tournament.status === 'upcoming' ? 'À venir' :
                         tournament.status === 'ongoing' ? 'En cours' :
                         tournament.status === 'completed' ? 'Terminé' :
                         'Annulé'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date de début</p>
                    <p className="font-medium">{formatDate(tournament.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Heure de début</p>
                    <p className="font-medium">{tournament.startTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-medium">{tournament.participantsCount} / {tournament.maxParticipants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Créé par</p>
                    <p className="font-medium">{tournament.createdBy.name} ({tournament.createdBy.email})</p>
                  </div>
                </div>
              </div>
            </div>
            
            {tournament.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{tournament.description}</p>
                </div>
              </div>
            )}
            
            {tournament.rules && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Règles</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{tournament.rules}</p>
                </div>
              </div>
            )}
            
            {tournament.prizes && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Récompenses</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{tournament.prizes}</p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Jeu</h2>
              <div className="flex items-center">
                {tournament.game.image_path ? (
                  <div className="w-16 h-16 mr-4 relative">
                    <Image 
                      src={tournament.game.image_path} 
                      alt={tournament.game.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 mr-4 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div>
                  <p className="font-medium">{tournament.game.name}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Participants ({tournament.participants.length})</h2>
              {tournament.participants.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {tournament.participants.map(participant => (
                    <li key={participant.id} className="py-2">
                      {participant.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Aucun participant pour le moment</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Demandes en attente ({tournament.pendingRequests.length})</h2>
              {tournament.pendingRequests.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {tournament.pendingRequests.map(request => (
                    <li key={request.id} className="py-2 flex justify-between items-center">
                      <span>{request.name}</span>
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-800">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Aucune demande en attente</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer le tournoi "{tournament.name}" ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                disabled={deleteLoading}
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteTournament}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Suppression...
                  </>
                ) : (
                  'Supprimer'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
