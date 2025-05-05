'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ApiTestPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [apiResults, setApiResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [selectedApi, setSelectedApi] = useState('/api/admin/users');

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas un admin
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
      return;
    }
    
    if (!authLoading && user && user.role === 'admin') {
      // Récupérer le token
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, [authLoading, user, router]);

  const testApi = async () => {
    setLoading(true);
    try {
      console.log(`Test de l'API: ${selectedApi}`);
      const response = await fetch(selectedApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log(`Statut de la réponse pour ${selectedApi}:`, response.status);
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { error: 'Impossible de parser la réponse JSON' };
      }
      
      setApiResults({
        status: response.status,
        ok: response.ok,
        data: data
      });
    } catch (error: any) {
      console.error(`Erreur lors du test de l'API ${selectedApi}:`, error);
      setApiResults({
        status: 'Erreur',
        ok: false,
        error: error.message || 'Erreur inconnue'
      });
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
          <h1 className="text-2xl font-bold">Test des API</h1>
          <Link
            href="/admin"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Retour au tableau de bord
          </Link>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Informations d'authentification</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Utilisateur connecté:</strong> {user ? user.email : 'Non connecté'}</p>
            <p><strong>Rôle:</strong> {user ? user.role : 'N/A'}</p>
            <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'Aucun token'}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Sélectionner une API à tester</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedApi}
              onChange={(e) => setSelectedApi(e.target.value)}
            >
              <option value="/api/admin/users">API Utilisateurs</option>
              <option value="/api/admin/tournaments">API Tournois</option>
              <option value="/api/admin/teams">API Équipes</option>
              <option value="/api/auth/session">API Session</option>
            </select>
            <button
              onClick={testApi}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Test en cours...' : 'Tester l\'API'}
            </button>
          </div>
        </div>

        {Object.keys(apiResults).length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Résultats</h2>
            <div className={`p-4 rounded ${apiResults.ok ? 'bg-green-100' : 'bg-red-100'}`}>
              <h3 className="font-medium">{selectedApi}</h3>
              <p><strong>Statut:</strong> {apiResults.status}</p>
              <p><strong>Succès:</strong> {apiResults.ok ? 'Oui' : 'Non'}</p>
              <div className="mt-4">
                <h4 className="font-medium">Données reçues:</h4>
                <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
                  {JSON.stringify(apiResults.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
