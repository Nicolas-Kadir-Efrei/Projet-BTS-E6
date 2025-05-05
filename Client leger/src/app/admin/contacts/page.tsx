'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
}

export default function ContactsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread, read, archived

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié et est un admin
    if (isAuthenticated === false) {
      router.push('/login');
      return;
    }
    
    if (user && user.role !== 'admin') {
      router.push('/');
      return;
    }
    
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated, user, router]);

  const fetchContacts = async () => {
    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour accéder à cette page');
        setLoading(false);
        router.push('/login');
        return;
      }
      
      const res = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setContacts(data);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des contacts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour effectuer cette action');
        return;
      }
      
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Mettre à jour la liste localement
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour effectuer cette action');
        return;
      }
      
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Supprimer le contact de la liste locale
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-black">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-black">Messages de contact</h1>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-4 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="mr-2 text-black">Filtrer par statut:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-black bg-white"
          >
            <option value="all">Tous</option>
            <option value="unread">Non lus</option>
            <option value="read">Lus</option>
            <option value="archived">Archivés</option>
          </select>
        </div>

        <div className="grid gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-lg shadow-lg p-6 ${
                contact.status === 'unread' ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-black">{contact.subject}</h2>
                  <div className="text-sm text-black mt-1">
                    De: {contact.name} ({contact.email})
                  </div>
                  <div className="text-sm text-black">
                    {format(new Date(contact.created_at), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={contact.status}
                    onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm text-black bg-white"
                  >
                    <option value="unread">Non lu</option>
                    <option value="read">Lu</option>
                    <option value="archived">Archivé</option>
                  </select>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-4 text-black whitespace-pre-wrap">
                {contact.message}
              </div>
            </div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-8 text-black">
              Aucun message {filter !== 'all' ? `avec le statut "${filter}"` : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
