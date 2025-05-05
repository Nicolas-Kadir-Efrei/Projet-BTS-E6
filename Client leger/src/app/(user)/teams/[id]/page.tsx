'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Member {
  id: string;
  name: string | null;
  email: string;
  role: 'owner' | 'member';
  joinedAt: string;
}

interface Team {
  id: string;
  name: string;
  tag: string;
  logo_url: string;
  description: string;
  createdAt: string;
  members: Member[];
  isOwner: boolean;
  pendingInvites: {
    id: string;
    email: string;
    createdAt: string;
  }[];
}

export default function TeamDetailsPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    description: '',
    logo_url: ''
  });
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchTeamDetails();
  }, [params.id]);

  const fetchTeamDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour voir les détails de l\'\u00e9quipe');
      }

      const res = await fetch(`/api/teams/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setTeam(data);
      setFormData({
        name: data.name,
        tag: data.tag,
        description: data.description,
        logo_url: data.logo_url
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour modifier l\'\u00e9quipe');
      }

      const res = await fetch(`/api/teams/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setTeam({ ...team!, ...formData });
      setEditMode(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour inviter des membres');
      }

      const res = await fetch(`/api/teams/${params.id}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: inviteEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Mettre à jour la liste des invitations en attente
      setTeam({
        ...team!,
        pendingInvites: [...team!.pendingInvites, {
          id: data.id,
          email: inviteEmail,
          createdAt: new Date().toISOString()
        }]
      });
      setInviteEmail('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setInviteLoading(false);
    }
  };

  const cancelInvite = async (inviteId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour annuler une invitation');
      }

      const res = await fetch(`/api/teams/${params.id}/invite/${inviteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Mettre à jour la liste des invitations
      setTeam({
        ...team!,
        pendingInvites: team!.pendingInvites.filter(invite => invite.id !== inviteId)
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeMember = async (memberId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir retirer ce membre ?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour retirer un membre');
      }

      const res = await fetch(`/api/teams/${params.id}/members/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Mettre à jour la liste des membres
      setTeam({
        ...team!,
        members: team!.members.filter(member => member.id !== memberId)
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTeam = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action est irréversible.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour supprimer une équipe');
      }

      const res = await fetch(`/api/teams/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue');
      }

      router.push('/teams');
    } catch (err: any) {
      setError(err.message);
    }
  };

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

  if (!team) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* En-tête de l'équipe */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0 h-20 w-20 relative overflow-hidden rounded-full">
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
                {editMode ? (
                  <form onSubmit={handleUpdate} className="space-y-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nom de l'équipe
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tag
                      </label>
                      <input
                        type="text"
                        value={formData.tag}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-black">{team.name}</h1>
                    <p className="text-sm text-gray-500">[{team.tag}]</p>
                    <p className="mt-2 text-gray-600">{team.description}</p>
                    {team.isOwner && (
                      <div className="mt-4 space-x-3">
                        <button
                          onClick={() => setEditMode(true)}
                          className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={deleteTeam}
                          className="text-red-600 hover:text-red-500 text-sm font-medium"
                        >
                          Supprimer l'équipe
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Liste des membres */}
        <div className="mt-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-black">Membres de l'équipe</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {team.members.map((member) => (
                <li key={member.id} className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">
                        {member.name || member.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {member.role === 'owner' ? 'Propriétaire' : 'Membre'}
                      </p>
                    </div>
                    {team.isOwner && member.id !== user?.id && (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="text-red-600 hover:text-red-500 text-sm font-medium"
                      >
                        Retirer
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Invitations en attente */}
        {team.isOwner && (
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-black">Inviter des membres</h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleInvite} className="flex gap-3">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Adresse email"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={inviteLoading}
                    className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors ${
                      inviteLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {inviteLoading ? 'Envoi...' : 'Inviter'}
                  </button>
                </form>

                {team.pendingInvites.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Invitations en attente
                    </h4>
                    <ul className="divide-y divide-gray-200">
                      {team.pendingInvites.map((invite) => (
                        <li key={invite.id} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-900">{invite.email}</p>
                            <p className="text-xs text-gray-500">
                              Invité le {new Date(invite.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => cancelInvite(invite.id)}
                            className="text-red-600 hover:text-red-500 text-sm font-medium"
                          >
                            Annuler
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
