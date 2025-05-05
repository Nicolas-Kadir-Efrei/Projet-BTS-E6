"use client";

import { useState, useEffect } from "react";

export default function JoinRequestButton({ tournamentId, userId }: { tournamentId: number; userId: number }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "none" | "pending" | "accepted" | "rejected">(null);

  useEffect(() => {
    const fetchRequest = async () => {
      console.log(`Vérification du statut pour userId=${userId}, tournamentId=${tournamentId}`);
      try {
        // Récupérer le token du localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Aucun token d'authentification trouvé");
          setStatus("none");
          return;
        }

        const res = await fetch(`/api/tournaments/${tournamentId}/join/user-status?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log("Statut reçu:", data);
          setStatus(data.status || "none");
        } else {
          console.error("Erreur lors de la récupération du statut:", await res.text());
          setStatus("none");
        }
      } catch (error) {
        console.error("Exception lors de la vérification du statut:", error);
        setStatus("none");
      }
    };
    if (userId) fetchRequest();
  }, [tournamentId, userId]);

  const handleRequest = async () => {
    setLoading(true);
    console.log(`Envoi d'une demande pour tournamentId=${tournamentId}`);
    try {
      // Récupérer le token du localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Aucun token d'authentification trouvé");
        alert("Vous devez être connecté pour envoyer une demande");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/tournaments/${tournamentId}/join/request`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      
      const responseData = await res.json();
      console.log("Réponse de l'API:", responseData);
      
      if (res.ok) {
        console.log("Demande envoyée avec succès");
        setStatus("pending");
      } else {
        console.error("Erreur lors de l'envoi de la demande:", responseData.error);
        alert(`Erreur: ${responseData.error || "Problème lors de l'envoi de la demande"}`);
      }
    } catch (error) {
      console.error("Exception lors de l'envoi de la demande:", error);
      alert("Une erreur s'est produite lors de l'envoi de la demande");
    } finally {
      setLoading(false);
    }
  };

  if (status === "pending") return <p className="text-yellow-600">Demande déjà envoyée (en attente)</p>;
  if (status === "accepted") return <p className="text-green-600">Tu es déjà accepté !</p>;

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      onClick={handleRequest}
      disabled={loading}
    >
      {loading ? "Envoi..." : "Demander au créateur du tournoi"}
    </button>
  );
}
