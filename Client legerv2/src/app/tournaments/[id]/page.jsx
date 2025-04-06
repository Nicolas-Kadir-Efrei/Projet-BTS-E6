'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import TeamMembers from '@/app/components/TeamMembers';
import TournamentMatches from '@/app/components/TournamentMatches';
import TournamentStatus from '@/app/components/TournamentStatus';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TournamentPage({ params }) {
    // Nettoyer l'ID des crochets s'ils sont présents
    const tournamentId = use(params).id.replace(/[\[\]]/g, '');
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await fetch(`/api/tournaments/${tournamentId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch tournament');
                }
                const data = await response.json();
                setTournament(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (tournamentId) {
            fetchTournament();
        }
    }, [tournamentId]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Chargement du tournoi...</div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg text-red-500">Erreur: {error}</div>
        </div>
    );

    if (!tournament) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg">Tournoi non trouvé</div>
        </div>
    );

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">{tournament.tournamentName}</h1>
                <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{tournament.game.name}</Badge>
                    <Badge>{tournament.tournament_types.type}</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Statut du tournoi */}
                <div className="md:col-span-2">
                    <TournamentStatus tournamentId={tournament.id} />
                </div>

                {/* Informations du tournoi */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Date et heure</h3>
                                <p>{new Date(tournament.startDate).toLocaleDateString()} à {tournament.startTime}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Format</h3>
                                <p>{tournament.format}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Participants</h3>
                                <p>{tournament.numTeams} équipes - {tournament.playersPerTeam} joueurs par équipe</p>
                                <p className="text-sm text-gray-500">Maximum: {tournament.maxParticipants} participants</p>
                            </div>
                            {tournament.rewards && (
                                <div>
                                    <h3 className="font-semibold">Récompenses</h3>
                                    <p>{tournament.rewards}</p>
                                </div>
                            )}
                            {tournament.rules && (
                                <div>
                                    <h3 className="font-semibold">Règles</h3>
                                    <p className="whitespace-pre-wrap">{tournament.rules}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Liste des équipes */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Équipes</h2>
                    {tournament.teams.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <p>Aucune équipe inscrite pour le moment</p>
                            </CardContent>
                        </Card>
                    ) : (
                        tournament.teams.map(team => (
                            <div key={team.id}>
                                <h3 className="text-xl font-semibold mb-4">{team.teamName || 'Équipe sans nom'}</h3>
                                <TeamMembers teamId={team.id} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Matches du tournoi */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Matches</h2>
                <TournamentMatches tournamentId={tournament.id} />
            </div>
        </div>
    );
}
