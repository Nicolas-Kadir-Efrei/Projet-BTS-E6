"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  pseudo: string;
  email: string;
  sexe: string;
  name: string;
  last_name: string;
};

type JoinRequest = {
  id: number;
  status: string;
  user: User;
};

type Tournament = {
  id: number;
  tournamentName: string;
  joinRequests: JoinRequest[];
};

export default function TournamentRequestsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Récupérer le token du localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Aucun token d'authentification trouvé");
          setLoading(false);
          return;
        }

        console.log("Récupération des demandes avec token");
        const response = await fetch("/api/tournaments/my-requests", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur API:", errorData);
          throw new Error(errorData.error || "Erreur lors de la récupération des demandes");
        }
        
        const data = await response.json();
        console.log("Données reçues:", data);
        setTournaments(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (tournamentId: number, requestId: number, action: "accept" | "reject") => {
    try {
      // Récupérer le token du localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Aucun token d'authentification trouvé");
        alert("Vous devez être connecté pour effectuer cette action");
        return;
      }

      const response = await fetch(`/api/tournaments/${tournamentId}/join/handle`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ requestId, action }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur API:", errorData);
        throw new Error(errorData.error || "Erreur lors du traitement de la demande");
      }

      // Mettre à jour l'état local
      setTournaments(prevTournaments => 
        prevTournaments.map(tournament => {
          if (tournament.id === tournamentId) {
            return {
              ...tournament,
              joinRequests: tournament.joinRequests.filter(req => req.id !== requestId)
            };
          }
          return tournament;
        }).filter(tournament => tournament.joinRequests.length > 0)
      );
      
      // Rafraîchir la page pour mettre à jour les données
      router.refresh();
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Une erreur s'est produite: ${error}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Gestion des demandes de participation</h1>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Gestion des demandes de participation</h1>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">Vous n'avez aucune demande de participation en attente.</p>
          <Link href="/tournaments" className="text-blue-500 hover:underline">
            Retour aux tournois
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestion des demandes de participation</h1>
      
      {tournaments.map((tournament) => (
        <div key={tournament.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{tournament.tournamentName}</h2>
            <Link 
              href={`/tournaments/${tournament.id}`} 
              className="text-blue-500 hover:underline text-sm"
            >
              Voir le tournoi
            </Link>
          </div>
          
          <div className="divide-y">
            {tournament.joinRequests.map((request) => (
              <div key={request.id} className="py-4 border-b border-gray-200 last:border-b-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Profil de l'utilisateur */}
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">{request.user.pseudo.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{request.user.pseudo}</h3>
                        <p className="text-gray-600 text-sm">{request.user.email}</p>
                      </div>
                    </div>
                    <div className="ml-15 pl-15 mt-2">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">Nom:</span> {request.user.last_name}
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Prénom:</span> {request.user.name}
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Sexe:</span> {request.user.sexe === 'M' ? 'Homme' : 'Femme'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Boutons d'action */}
                  <div className="flex space-x-3 mt-3 md:mt-0">
                    <button
                      onClick={() => handleAction(tournament.id, request.id, "accept")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 md:flex-none"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleAction(tournament.id, request.id, "reject")}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 md:flex-none"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
