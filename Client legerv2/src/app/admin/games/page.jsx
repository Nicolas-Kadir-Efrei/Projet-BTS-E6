'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export default function AdminGamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newGameName, setNewGameName] = useState('');
  const [editingGame, setEditingGame] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/admin/games');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddGame = async () => {
    try {
      const response = await fetch('/api/admin/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGameName }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const newGame = await response.json();
      setGames([...games, newGame]);
      setNewGameName('');
      
      toast({
        title: "Succès",
        description: "Le jeu a été ajouté avec succès"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message
      });
    }
  };

  const handleUpdateGame = async () => {
    try {
      const response = await fetch('/api/admin/games', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingGame.id,
          name: editingGame.name
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const updatedGame = await response.json();
      setGames(games.map(game => 
        game.id === updatedGame.id ? updatedGame : game
      ));
      setEditingGame(null);
      
      toast({
        title: "Succès",
        description: "Le jeu a été mis à jour avec succès"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message
      });
    }
  };

  const handleDeleteGame = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/games', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setGames(games.filter(game => game.id !== id));
      
      toast({
        title: "Succès",
        description: "Le jeu a été supprimé avec succès"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Gestion des jeux</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Ajouter un jeu</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau jeu</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="gameName" className="text-sm font-medium">
                      Nom du jeu
                    </label>
                    <Input
                      id="gameName"
                      value={newGameName}
                      onChange={(e) => setNewGameName(e.target.value)}
                      placeholder="Entrez le nom du jeu"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button onClick={handleAddGame} disabled={!newGameName.trim()}>
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.id}</TableCell>
                  <TableCell>{game.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingGame(game)}
                          >
                            Modifier
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Modifier le jeu</DialogTitle>
                          </DialogHeader>
                          {editingGame && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label htmlFor="editGameName" className="text-sm font-medium">
                                  Nom du jeu
                                </label>
                                <Input
                                  id="editGameName"
                                  value={editingGame.name}
                                  onChange={(e) => setEditingGame({
                                    ...editingGame,
                                    name: e.target.value
                                  })}
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Annuler</Button>
                            </DialogClose>
                            <Button
                              onClick={handleUpdateGame}
                              disabled={!editingGame?.name.trim()}
                            >
                              Mettre à jour
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteGame(game.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
