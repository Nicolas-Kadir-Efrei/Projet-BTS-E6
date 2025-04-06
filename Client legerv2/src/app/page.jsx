'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Tournois',
    description: 'Participez à des tournois compétitifs',
    icon: '🏆',
    href: '/tournaments',
    color: 'bg-purple-500',
  },
  {
    title: 'Équipes',
    description: 'Gérez vos équipes et vos coéquipiers',
    icon: '👥',
    href: '/teams',
    color: 'bg-blue-500',
  },
  {
    title: 'Discussions',
    description: 'Échangez avec la communauté',
    icon: '💬',
    href: '/discussion',
    color: 'bg-green-500',
  },
  {
    title: 'Profil',
    description: 'Gérez votre profil et vos paramètres',
    icon: '👤',
    href: '/profile',
    color: 'bg-yellow-500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Bienvenue sur la Plateforme de Tournois
          </h1>
          <p className="text-xl text-gray-300">
            Organisez, participez et suivez des tournois passionnants
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={feature.href}>
                <div className={`${feature.color} rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full`}>
                  <div className="p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/register">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
              Commencer l'aventure
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
