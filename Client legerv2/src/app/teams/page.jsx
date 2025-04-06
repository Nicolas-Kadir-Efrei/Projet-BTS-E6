// src/app/teams/page.jsx
'use client';

import { useState } from 'react';

const AssignTeamNamePage = () => {
  const [formData, setFormData] = useState({
    tournamentId: '',
    teamName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        alert('Nom de l\'équipe affecté avec succès!');
      } else {
        const errorData = await res.json();
        alert(`Erreur: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'affectation du nom de l\'équipe:', error);
      alert('Erreur serveur');
    }
  };

  return (
    <div className="container">
      <h1>Affecter un Nom à une Équipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID du Tournoi:</label>
          <input
            type="text"
            name="tournamentId"
            value={formData.tournamentId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nom de l'Équipe:</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Affecter le Nom</button>
      </form>
    </div>
  );
};

export default AssignTeamNamePage;
