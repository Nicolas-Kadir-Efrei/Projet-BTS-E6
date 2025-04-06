'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const adminFeatures = [
  {
    title: 'Gestion des Tournois',
    description: 'Créer et gérer les tournois',
    icon: '🏆',
    href: '/admin/tournaments'
  },
  {
    title: 'Gestion des Jeux',
    description: 'Ajouter et modifier les jeux disponibles',
    icon: '🎮',
    href: '/admin/games'
  },
  {
    title: 'Gestion des Utilisateurs',
    description: 'Gérer les comptes utilisateurs',
    icon: '👥',
    href: '/admin/users'
  },
  {
    title: 'Types de Tournois',
    description: 'Configurer les types de tournois',
    icon: '📋',
    href: '/admin/tournament-types'
  }
];

export default function AdminHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le token
    const token = document.cookie.split('token=')[1]?.split(';')[0];
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      setUser(userData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Panneau d'Administration
          </h1>
          <p className="text-xl text-gray-300">
            Bienvenue, {user?.email}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {adminFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Vous avez accès à toutes les fonctionnalités d'administration.
            Utilisez-les avec précaution.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
