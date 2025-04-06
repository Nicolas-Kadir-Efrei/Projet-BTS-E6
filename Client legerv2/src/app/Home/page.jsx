"use client";

import Navbar from "../../components/Navbar";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
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
    <div className="home-container">
      <Navbar />
      <header className="hero-section">
        <h1 className="hero-title">Bienvenue sur eSport Pro Management</h1>
        <p className="hero-subtitle">
          Votre plateforme ultime pour gérer et organiser des tournois Esport.
        </p>
        <div className="cta-buttons">
          <button className="cta-button primary">
            <a href="/tournaments">Voir les tournois</a>
          </button>
          <button className="cta-button secondary">
            <a href="/userprofile">Gérer le profil</a>
          </button>
          <button className="cta-button secondary">
            <a href="/createtournament">Créer un tournoi</a>
          </button>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Bienvenue {user?.email}
            </h1>
            <p className="text-gray-600 mb-6">
              Vous êtes connecté en tant qu'utilisateur. Voici votre espace personnel où vous pouvez :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Participer à des tournois</li>
              <li>Gérer vos équipes</li>
              <li>Consulter votre profil</li>
              <li>Interagir avec la communauté</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
