'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DebugPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

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

  const testApi = async (endpoint: string) => {
    setLoading(true);
    try {
      console.log(`Test de l'API: ${endpoint}`);
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log(`Statut de la réponse pour ${endpoint}:`, response.status);
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { error: 'Impossible de parser la réponse JSON' };
      }
      
      setApiStatus(prev => ({
        ...prev,
        [endpoint]: {
          status: response.status,
          ok: response.ok,
          data: response.ok ? (Array.isArray(data) ? `${data.length} éléments` : 'Données reçues') : data
        }
      }));
    } catch (error) {
      console.error(`Erreur lors du test de l'API ${endpoint}:`, error);
      setApiStatus(prev => ({
        ...prev,
        [endpoint]: {
          status: 'Erreur',
          ok: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllApis = async () => {
    await testApi('/api/admin/users');
    await testApi('/api/admin/tournaments');
    await testApi('/api/admin/teams');
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
          <h1 className="text-2xl font-bold">Débogage des API</h1>
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
          <h2 className="text-xl font-semibold mb-2">Test des API</h2>
          <button
            onClick={testAllApis}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Test en cours...' : 'Tester toutes les API'}
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Résultats</h2>
          
          {Object.entries(apiStatus).length === 0 ? (
            <p className="text-gray-500">Aucun test effectué</p>
          ) : (
            Object.entries(apiStatus).map(([endpoint, result]) => (
              <div key={endpoint} className={`p-4 rounded ${result.ok ? 'bg-green-100' : 'bg-red-100'}`}>
                <h3 className="font-medium">{endpoint}</h3>
                <p><strong>Statut:</strong> {result.status}</p>
                <p><strong>Succès:</strong> {result.ok ? 'Oui' : 'Non'}</p>
                {result.ok ? (
                  <p><strong>Données:</strong> {result.data}</p>
                ) : (
                  <p><strong>Erreur:</strong> {result.error || 'Erreur inconnue'}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
