'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Invitation {
  id: string;
  team: {
    id: string;
    name: string;
    tag: string;
    logo_url: string | null;
  };
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  created_at: string;
}

export default function InvitationsPage() {
  const router = useRouter();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const res = await fetch('/api/invitations');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setInvitations(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInvitation = async (invitationId: string, accept: boolean) => {
    try {
      const res = await fetch(`/api/invitations/${invitationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: accept ? 'ACCEPTED' : 'REJECTED',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Mettre à jour la liste des invitations
      setInvitations(invitations.filter(inv => inv.id !== invitationId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-black">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Invitations</h1>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-4 rounded">
          {error}
        </div>
      )}

      {invitations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-black">Aucune invitation en attente</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                {invitation.team.logo_url && (
                  <img
                    src={invitation.team.logo_url}
                    alt={invitation.team.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {invitation.team.name}
                  </h3>
                  <p className="text-sm text-black">
                    Tag: {invitation.team.tag}
                  </p>
                </div>
              </div>

              <p className="text-sm text-black mb-4">
                Reçue le {new Date(invitation.created_at).toLocaleDateString()}
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleInvitation(invitation.id, true)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleInvitation(invitation.id, false)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Refuser
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
