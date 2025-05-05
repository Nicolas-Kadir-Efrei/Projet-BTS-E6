'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface Team {
  id: string;
  name: string;
  tag: string;
  logo_url: string;
  description: string;
  createdAt: string;
  members: {
    id: string;
    name: string;
    email: string;
  }[];
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Vous devez être connecté pour voir les équipes');
        }

        const res = await fetch('/api/teams/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Une erreur est survenue');
        }

        setTeams(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Équipes</h1>
          <Link
            href="/teams/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Créer une équipe
          </Link>
        </div>

        {teams.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune équipe</h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez par créer une nouvelle équipe.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 relative overflow-hidden rounded-full">
                      {team.logo_url ? (
                        <div className="w-full h-full">
                          <img 
                            src={team.logo_url}
                            alt={team.name}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              // Fallback en cas d'erreur de chargement de l'image
                              const target = e.target as HTMLImageElement;
                              target.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(team.name)}&backgroundColor=b6e3f4&radius=50`;
                            }}
                          />
                        </div>
                      ) : (
                        <iframe 
                          src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(team.name)}&backgroundColor=b6e3f4&radius=50`}
                          title={`Avatar de ${team.name}`}
                          className="w-full h-full border-0"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black">
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-500">[{team.tag}]</p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                    {team.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Membres:</h4>
                    <div className="mt-2 flex -space-x-2 overflow-hidden">
                      {team.members.slice(0, 5).map((member) => (
                        <div
                          key={member.id}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center"
                          title={member.name || member.email}
                        >
                          <span className="text-xs font-medium text-gray-600">
                            {(member.name || member.email).charAt(0).toUpperCase()}
                          </span>
                        </div>
                      ))}
                      {team.members.length > 5 && (
                        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            +{team.members.length - 5}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <Link
                    href={`/teams/${team.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Voir les détails →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
