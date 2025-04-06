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

export default function AdminTournamentTypesPage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newType, setNewType] = useState('');
  const [editingType, setEditingType] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch('/api/admin/tournament-types');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      setTypes(data);
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

  const handleAddType = async () => {
    try {
      const response = await fetch('/api/admin/tournament-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: newType }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const newTournamentType = await response.json();
      setTypes([...types, newTournamentType]);
      setNewType('');
      
      toast({
        title: "Succès",
        description: "Le type de tournoi a été ajouté avec succès"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message
      });
    }
  };

  const handleUpdateType = async () => {
    try {
      const response = await fetch('/api/admin/tournament-types', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingType.id,
          type: editingType.type
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const updatedType = await response.json();
      setTypes(types.map(type => 
        type.id === updatedType.id ? updatedType : type
      ));
      setEditingType(null);
      
      toast({
        title: "Succès",
        description: "Le type de tournoi a été mis à jour avec succès"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message
      });
    }
  };

  const handleDeleteType = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce type de tournoi ?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/tournament-types', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setTypes(types.filter(type => type.id !== id));
      
      toast({
        title: "Succès",
        description: "Le type de tournoi a été supprimé avec succès"
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
            <span>Types de tournois</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Ajouter un type</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau type de tournoi</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="typeName" className="text-sm font-medium">
                      Nom du type
                    </label>
                    <Input
                      id="typeName"
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      placeholder="Ex: Pro, Amateur, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button onClick={handleAddType} disabled={!newType.trim()}>
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
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {types.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>{type.id}</TableCell>
                  <TableCell>{type.type}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingType(type)}
                          >
                            Modifier
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Modifier le type de tournoi</DialogTitle>
                          </DialogHeader>
                          {editingType && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label htmlFor="editTypeName" className="text-sm font-medium">
                                  Nom du type
                                </label>
                                <Input
                                  id="editTypeName"
                                  value={editingType.type}
                                  onChange={(e) => setEditingType({
                                    ...editingType,
                                    type: e.target.value
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
                              onClick={handleUpdateType}
                              disabled={!editingType?.type.trim()}
                            >
                              Mettre à jour
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteType(type.id)}
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
