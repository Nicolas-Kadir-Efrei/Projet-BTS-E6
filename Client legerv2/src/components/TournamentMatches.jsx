'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function TournamentMatches({ tournamentId }) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger les matches
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(`/api/matches?tournamentId=${tournamentId}`);
                if (!response.ok) throw new Error('Failed to fetch matches');
                const data = await response.json();
                setMatches(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [tournamentId]);

    // Mettre à jour le score d'un match
    const updateMatch = async (matchId, team1Score, team2Score) => {
        try {
            const response = await fetch('/api/matches', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: matchId,
                    team1Score: parseInt(team1Score),
                    team2Score: parseInt(team2Score),
                    status: 'completed'
                })
            });

            if (!response.ok) throw new Error('Failed to update match');
            
            const updatedMatch = await response.json();
            setMatches(matches.map(match => 
                match.id === matchId ? updatedMatch : match
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'in_progress': return 'bg-blue-500';
            case 'completed': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) return <div>Chargement des matches...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <Card className="w-full">
            <CardHeader>
                <h3 className="text-lg font-semibold">Matches du tournoi</h3>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {matches.length === 0 ? (
                        <p>Aucun match programmé</p>
                    ) : (
                        matches.map((match) => (
                            <div key={match.id} className="p-4 border rounded space-y-2">
                                <div className="flex justify-between items-center">
                                    <Badge className={getStatusColor(match.status)}>
                                        {match.status}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                        {new Date(match.matchDate).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-5 gap-2 items-center">
                                    <div className="col-span-2">
                                        <p className="font-medium">{match.team1.teamName}</p>
                                    </div>
                                    
                                    <div className="col-span-1 flex justify-center items-center gap-2">
                                        <Input
                                            type="number"
                                            min="0"
                                            className="w-16 text-center"
                                            value={match.team1Score || ''}
                                            onChange={(e) => updateMatch(match.id, e.target.value, match.team2Score)}
                                            disabled={match.status === 'completed'}
                                        />
                                        <span>-</span>
                                        <Input
                                            type="number"
                                            min="0"
                                            className="w-16 text-center"
                                            value={match.team2Score || ''}
                                            onChange={(e) => updateMatch(match.id, match.team1Score, e.target.value)}
                                            disabled={match.status === 'completed'}
                                        />
                                    </div>

                                    <div className="col-span-2 text-right">
                                        <p className="font-medium">{match.team2.teamName}</p>
                                    </div>
                                </div>

                                {match.winner && (
                                    <div className="text-center mt-2">
                                        <Badge variant="success">
                                            Vainqueur: {match.winner.teamName}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
