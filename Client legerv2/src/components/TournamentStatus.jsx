'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function TournamentStatus({ tournamentId }) {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusOptions = [
        { value: 'registration', label: 'Inscription' },
        { value: 'in_progress', label: 'En cours' },
        { value: 'completed', label: 'Terminé' },
        { value: 'cancelled', label: 'Annulé' }
    ];

    // Charger le statut actuel
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`/api/tournament-status?tournamentId=${tournamentId}`);
                if (!response.ok) throw new Error('Failed to fetch tournament status');
                const data = await response.json();
                setStatus(data.status);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [tournamentId]);

    // Mettre à jour le statut
    const updateStatus = async (newStatus) => {
        try {
            const response = await fetch('/api/tournament-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tournamentId,
                    status: newStatus
                })
            });

            if (!response.ok) throw new Error('Failed to update tournament status');
            
            const data = await response.json();
            setStatus(data.status);
        } catch (err) {
            setError(err.message);
        }
    };

    const getStatusColor = (currentStatus) => {
        switch (currentStatus) {
            case 'registration': return 'bg-blue-500';
            case 'in_progress': return 'bg-green-500';
            case 'completed': return 'bg-purple-500';
            case 'cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) return <div>Chargement du statut...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <Card className="w-full">
            <CardHeader>
                <h3 className="text-lg font-semibold">Statut du tournoi</h3>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-white ${getStatusColor(status)}`}>
                            {statusOptions.find(opt => opt.value === status)?.label || 'Inconnu'}
                        </div>
                        
                        <Select
                            value={status}
                            onValueChange={updateStatus}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Changer le statut" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(option => (
                                    <SelectItem 
                                        key={option.value} 
                                        value={option.value}
                                        disabled={
                                            // Empêcher de revenir en arrière une fois le tournoi commencé
                                            (status === 'in_progress' && option.value === 'registration') ||
                                            // Empêcher de modifier une fois terminé ou annulé
                                            (status === 'completed' || status === 'cancelled')
                                        }
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {(status === 'completed' || status === 'cancelled') && (
                        <p className="text-sm text-gray-500">
                            Le tournoi est {status === 'completed' ? 'terminé' : 'annulé'} et ne peut plus être modifié.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
