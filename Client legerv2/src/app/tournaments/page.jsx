'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import TournamentCard from '@/components/TournamentCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Example data - replace with actual data from your API
  const tournaments = [
    {
      id: 1,
      name: "League Championship",
      game: "League of Legends",
      type: "Pro",
      startDate: "2025-05-01",
      maxTeams: 16,
      registeredTeams: 12,
    },
    {
      id: 2,
      name: "CS:GO Masters",
      game: "Counter-Strike",
      type: "Semi-pro",
      startDate: "2025-05-15",
      maxTeams: 8,
      registeredTeams: 8,
    },
    // Add more tournaments as needed
  ];

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = gameFilter === 'all' || tournament.game === gameFilter;
    const matchesType = typeFilter === 'all' || tournament.type === typeFilter;
    return matchesSearch && matchesGame && matchesType;
  });

  return (
    <PageLayout
      title="Tournois"
      description="Découvrez et participez aux tournois à venir"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-4">
            <Input
              placeholder="Rechercher un tournoi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Select value={gameFilter} onValueChange={setGameFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jeu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les jeux</SelectItem>
                <SelectItem value="League of Legends">League of Legends</SelectItem>
                <SelectItem value="Counter-Strike">Counter-Strike</SelectItem>
                <SelectItem value="Valorant">Valorant</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Semi-pro">Semi-pro</SelectItem>
                <SelectItem value="Amateur">Amateur</SelectItem>
                <SelectItem value="Beginner">Débutant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto">
            Créer un tournoi
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">
              Aucun tournoi trouvé
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
