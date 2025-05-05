'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import Select, { StylesConfig, ActionMeta } from 'react-select';

interface UserSearchResult {
  id: string;
  email: string;
  name: string;
}

export default function CreateTeamPage() {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '', // Sera utilisé comme teamName dans l'API
    logo_url: ''
  });
  
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, logo_url: url });
    if (url) {
      // Effacer toute erreur précédente
      setError('');
      // Mettre à jour la prévisualisation
      setLogoPreview(url);
    } else {
      setLogoPreview('');
    }
  };
  
  // Vérifier si l'URL de l'image est valide - cette fonction n'est plus utilisée directement
  // car nous laissons le navigateur tenter de charger l'image et gérer les erreurs
  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    // Accepter toutes les URLs - nous utilisons maintenant l'événement onError pour gérer les erreurs
    return true;
  };

  const [allUsers, setAllUsers] = useState<UserSearchResult[]>([]);
  
  // Charger tous les utilisateurs au chargement de la page
  useEffect(() => {
    const fetchAllUsers = async () => {
      setSearchLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        setAllUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchAllUsers();
  }, []);
  
  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    // Filtrer les utilisateurs localement
    const filteredUsers = allUsers.filter(user => 
      (user.name?.toLowerCase().includes(query.toLowerCase()) || 
       user.email.toLowerCase().includes(query.toLowerCase())) &&
      !selectedUsers.some(selected => selected.id === user.id)
    );
    
    setSearchResults(filteredUsers);
  };

  const handleUserSelect = (user: UserSearchResult) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchResults(searchResults.filter(u => u.id !== user.id));
    setSearchQuery('');
  };

  const handleUserRemove = (user: UserSearchResult) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
  };

  // Pas besoin d'uploader le logo puisqu'on utilise uniquement l'URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Accepter toutes les URLs pour plus de flexibilité
      // Les utilisateurs peuvent utiliser n'importe quelle URL d'image

      // Create team
      const token = localStorage.getItem('token');
      const teamRes = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          invitedUsers: selectedUsers.map(u => u.id),
        }),
      });

      const teamData = await teamRes.json();

      if (!teamRes.ok) {
        throw new Error(teamData.error || 'Une erreur est survenue');
      }

      router.push('/teams');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-black">Créer une équipe</h1>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations de base */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-black font-medium">
                  Nom de l&apos;équipe
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Nom de votre équipe"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Choisissez un nom unique pour votre équipe
                </p>
              </div>
            </div>

            {/* Logo et membres */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-black font-medium">
                  Logo de l'équipe (URL)
                </label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative bg-gray-50"
                    >
                      {logoPreview ? (
                        <div className="w-full h-full">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              // Utiliser une image de remplacement en cas d'erreur
                              target.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(formData.name || 'team')}&backgroundColor=b6e3f4&radius=50`;
                              // Afficher un message d'erreur
                              setError("L'URL de l'image n'est pas valide ou l'image n'est pas accessible. Une image par défaut sera utilisée.");
                              // Après 3 secondes, effacer le message d'erreur
                              setTimeout(() => setError(''), 3000);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-400 text-xs text-center mt-1">
                            Aperçu du logo
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          URL de l'image
                        </label>
                        <div className="mt-1">
                          <div className="flex">
                            <input
                              type="text"
                              id="logo_url"
                              name="logo_url"
                              value={formData.logo_url}
                              onChange={handleLogoUrlChange}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                              placeholder="https://example.com/image.jpg"
                            />
                            {!formData.logo_url && (
                              <button
                                type="button"
                                onClick={() => {
                                  const defaultLogo = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(formData.name || 'team')}&backgroundColor=b6e3f4&radius=50`;
                                  setFormData({ ...formData, logo_url: defaultLogo });
                                  setLogoPreview(defaultLogo);
                                }}
                                className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Générer
                              </button>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Entrez l'URL d'une image ou cliquez sur "Générer" pour créer un avatar automatiquement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User search and invites avec react-select */}
              <div>
                <label className="block mb-2 text-black font-medium">
                  Inviter des joueurs
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    {searchLoading ? (
                      <div className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black">
                        <span className="text-blue-500">Chargement des utilisateurs...</span>
                      </div>
                    ) : (
                      <Select
                        isMulti={false}
                        options={allUsers
                          .filter(user => !selectedUsers.some(selected => selected.id === user.id))
                          .map(user => ({
                            value: user.id,
                            label: user.name || user.email
                          }))}
                        onChange={(newValue: unknown, actionMeta: ActionMeta<unknown>) => {
                          const option = newValue as { value: string; label: string } | null;
                          if (option) {
                            const selectedUser = allUsers.find(user => user.id === option.value);
                            if (selectedUser) handleUserSelect(selectedUser);
                          }
                        }}
                        placeholder="Rechercher et sélectionner des joueurs..."
                        noOptionsMessage={() => "Aucun utilisateur trouvé"}
                        classNamePrefix="react-select"
                        className="text-black"
                        styles={{
                          control: (base: any) => ({
                            ...base,
                            borderColor: '#d1d5db',
                            boxShadow: 'none',
                            '&:hover': {
                              borderColor: '#9ca3af'
                            }
                          }),
                          option: (base: any, state: { isFocused: boolean }) => ({
                            ...base,
                            backgroundColor: state.isFocused ? '#e5e7eb' : 'white',
                            color: 'black'
                          })
                        } as StylesConfig}
                        isClearable
                      />
                    )}
                  </div>

                  {/* Selected users */}
                  {selectedUsers.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-black mb-2">
                        Joueurs invités:
                      </h4>
                      <div className="space-y-2">
                        {selectedUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex justify-between items-center bg-gray-50 p-2 rounded"
                          >
                            <span className="text-black">{user.name || user.email}</span>
                            <button
                              type="button"
                              onClick={() => handleUserRemove(user)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Retirer
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Création...' : 'Créer l\'équipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
