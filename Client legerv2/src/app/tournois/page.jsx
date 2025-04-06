// src/app/tournois/page.jsx
'use client';

import { useState, useEffect } from 'react';

const TournamentsListPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch('/api/tournois');
        const data = await res.json();

        if (res.ok) {
          setTournaments(data.data);
        } else {
          alert(`Erreur: ${data.error}`);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des tournois:', error);
        alert('Erreur serveur');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container">
      <h1>Liste des Tournois</h1>
      {tournaments.length === 0 ? (
        <p>Aucun tournoi n'a été trouvé.</p>
      ) : (
        tournaments.map((tournament) => (
          <div key={tournament.id}>
            <h2>{tournament.tournamentName}</h2>
            <p>Date: {new Date(tournament.startDate).toLocaleDateString()}</p>
            <p>Équipes:</p>
            <ul>
              {tournament.teams.map((team) => (
                <li key={team.id}>{team.teamName || 'Nom de l\'équipe non défini'}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default TournamentsListPage;
