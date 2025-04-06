'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TeamMembers({ teamId }) {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger les membres de l'équipe
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`/api/team-members?teamId=${teamId}`);
                if (!response.ok) throw new Error('Failed to fetch team members');
                const data = await response.json();
                setMembers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [teamId]);

    // Supprimer un membre
    const removeMember = async (userId) => {
        try {
            const response = await fetch(`/api/team-members?userId=${userId}&teamId=${teamId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to remove member');
            
            // Mettre à jour la liste des membres
            setMembers(members.filter(member => member.userId !== userId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Chargement des membres...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <Card className="w-full">
            <CardHeader>
                <h3 className="text-lg font-semibold">Membres de l'équipe</h3>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {members.length === 0 ? (
                        <p>Aucun membre dans l'équipe</p>
                    ) : (
                        members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                                <div>
                                    <p className="font-medium">{member.user.pseudo}</p>
                                    <p className="text-sm text-gray-500">
                                        {member.user.name} {member.user.last_name}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={member.role === 'captain' ? 'default' : 'secondary'}>
                                        {member.role}
                                    </Badge>
                                    <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => removeMember(member.userId)}
                                    >
                                        Retirer
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
