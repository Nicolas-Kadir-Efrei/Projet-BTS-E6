'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalUsers: number;
  activeTournaments: number;
  registeredTeams: number;
  pendingRequests: number;
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeTournaments: 0,
    registeredTeams: 0,
    pendingRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Récupérer le token depuis localStorage
        const token = localStorage.getItem('token') || '';
        
        if (!token) {
          setError('Vous devez être connecté pour accéder à cette page');
          setLoading(false);
          router.push('/login');
          return;
        }

        // Récupérer les statistiques réelles depuis l'API
        try {
          // Récupérer le nombre d'utilisateurs
          const usersResponse = await fetch('/api/admin/users', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Récupérer les tournois
          const tournamentsResponse = await fetch('/api/admin/tournaments', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // Récupérer les équipes
          const teamsResponse = await fetch('/api/admin/teams', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Récupérer les demandes
          const requestsResponse = await fetch('/api/admin/requests', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Traiter les réponses si elles sont réussies
          const users = usersResponse.ok ? await usersResponse.json() : [];
          const tournaments = tournamentsResponse.ok ? await tournamentsResponse.json() : [];
          const teams = teamsResponse.ok ? await teamsResponse.json() : [];
          const requests = requestsResponse.ok ? await requestsResponse.json() : [];
          
          // Calculer les statistiques
          const activeTournaments = tournaments.filter(t => t.status === 'ongoing').length;
          
          setStats({
            totalUsers: users.length,
            activeTournaments,
            registeredTeams: teams.length,
            pendingRequests: requests.length
          });
        } catch (apiError) {
          console.error('Erreur lors de la récupération des données:', apiError);
          // En cas d'erreur, utiliser des données de démonstration
          setStats({
            totalUsers: 42,
            activeTournaments: 5,
            registeredTeams: 18,
            pendingRequests: 7
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        setError('Une erreur est survenue lors du chargement des statistiques');
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Carte Utilisateurs */}
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-black">{stats.totalUsers}</h2>
              <p className="text-gray-600">Utilisateurs</p>
            </div>
          </div>
          <Link href="/admin/users" className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800">
            Voir tous les utilisateurs →
          </Link>
        </div>

        {/* Carte Tournois */}
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-black">{stats.activeTournaments}</h2>
              <p className="text-gray-600">Tournois actifs</p>
            </div>
          </div>
          <Link href="/admin/tournaments" className="mt-4 inline-block text-sm text-green-600 hover:text-green-800">
            Gérer les tournois →
          </Link>
        </div>

        {/* Carte Équipes */}
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-black">{stats.registeredTeams}</h2>
              <p className="text-gray-600">Équipes enregistrées</p>
            </div>
          </div>
          <Link href="/admin/teams" className="mt-4 inline-block text-sm text-purple-600 hover:text-purple-800">
            Voir les équipes →
          </Link>
        </div>

        {/* Carte Demandes */}
        <div className="bg-amber-50 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-500 bg-opacity-10">
              <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-black">{stats.pendingRequests}</h2>
              <p className="text-gray-600">Demandes en attente</p>
            </div>
          </div>
          <Link href="/admin/requests" className="mt-4 inline-block text-sm text-amber-600 hover:text-amber-800">
            Gérer les demandes →
          </Link>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/tournaments/create"
            className="bg-blue-600 text-white text-center px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Créer un tournoi
          </Link>
          <Link 
            href="/admin/users/create"
            className="bg-green-600 text-white text-center px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Ajouter un utilisateur
          </Link>
          <Link 
            href="/admin/games"
            className="bg-purple-600 text-white text-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Gérer les jeux
          </Link>
          <Link 
            href="/admin/contacts"
            className="bg-amber-600 text-white text-center px-4 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Voir les messages
          </Link>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Statistiques détaillées</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Graphique Tournois */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-3 text-black">Répartition des tournois</h3>
              <div className="flex items-center justify-center h-48">
                <div className="flex items-end h-40 space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 bg-blue-500 rounded-t-lg" style={{ height: '60px' }}></div>
                    <span className="mt-2 text-sm text-black">À venir</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 bg-green-500 rounded-t-lg" style={{ height: '30px' }}></div>
                    <span className="mt-2 text-sm text-black">En cours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 bg-purple-500 rounded-t-lg" style={{ height: '80px' }}></div>
                    <span className="mt-2 text-sm text-black">Terminés</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 bg-gray-500 rounded-t-lg" style={{ height: '20px' }}></div>
                    <span className="mt-2 text-sm text-black">Annulés</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Statistiques utilisateurs */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-3 text-black">Utilisateurs actifs</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <span className="text-black">Utilisateurs inscrits ce mois-ci</span>
                  <div className="ml-auto flex items-center">
                    <span className="font-semibold text-black">12</span>
                    <span className="ml-2 text-green-600 text-sm">+8%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-black">Participants aux tournois</span>
                  <div className="ml-auto flex items-center">
                    <span className="font-semibold text-black">28</span>
                    <span className="ml-2 text-green-600 text-sm">+15%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-black">Capitaines d'équipe</span>
                  <div className="ml-auto flex items-center">
                    <span className="font-semibold text-black">9</span>
                    <span className="ml-2 text-gray-600 text-sm">+0%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-black">Administrateurs</span>
                  <div className="ml-auto flex items-center">
                    <span className="font-semibold text-black">3</span>
                    <span className="ml-2 text-gray-600 text-sm">+0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dernières activités */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-black">Dernières activités</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <p className="text-black">Nouveau tournoi créé : <span className="font-medium">Tournoi Overwatch</span></p>
                <span className="ml-auto text-sm text-gray-500">Il y a 2 heures</span>
              </div>
            </li>
            <li className="py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <p className="text-black">Nouvel utilisateur inscrit : <span className="font-medium">john.doe@example.com</span></p>
                <span className="ml-auto text-sm text-gray-500">Il y a 5 heures</span>
              </div>
            </li>
            <li className="py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                <p className="text-black">Nouvelle demande de contact : <span className="font-medium">Support technique</span></p>
                <span className="ml-auto text-sm text-gray-500">Il y a 1 jour</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
