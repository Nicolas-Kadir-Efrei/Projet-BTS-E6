"use client";

import { useAuth } from '@/contexts/AuthContext';
import JoinRequestButton from './JoinRequestButton';
import Link from 'next/link';

export default function JoinRequestSection({ tournamentId, creatorId }: { tournamentId: number, creatorId: number }) {
  const { user, loading } = useAuth();
  
  // Utiliser le système d'authentification personnalisé
  const isAuthenticated = !!user;
  const userId = user?.id || null;
  const isCreator = userId === creatorId;

  // Afficher un indicateur de chargement pendant la vérification de session
  if (loading) {
    return <p className="text-center text-gray-500 mt-4">Chargement...</p>;
  }

  return (
    <div className="mt-8">
      {/* Affiche un petit debug pour comprendre l'état */}
      <div className="text-xs text-gray-400 mb-2">
        Connecté: {isAuthenticated ? 'oui' : 'non'}, UserId: {userId || 'non connecté'}, Créateur: {isCreator ? 'oui' : 'non'}
      </div>

      {isAuthenticated && isCreator && (
        <Link
          href="/tournament-requests"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg mb-4"
        >
          Gérer les demandes
        </Link>
      )}
      {isAuthenticated && !isCreator && userId && (
        <JoinRequestButton tournamentId={tournamentId} userId={userId} />
      )}
      {!isAuthenticated && (
        <p className="text-center text-blue-600 mt-4">Connecte-toi pour demander à rejoindre le tournoi !</p>
      )}
    </div>
  );
}
