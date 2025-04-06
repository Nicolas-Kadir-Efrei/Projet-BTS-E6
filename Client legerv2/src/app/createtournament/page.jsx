"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const tournamentSchema = z.object({
  tournamentName: z.string().min(3, "Le nom doit faire au moins 3 caractères"),
  startDate: z.string().min(1, "La date est requise"),
  startTime: z.string().min(1, "L'heure est requise"),
  gameId: z.string().min(1, "Veuillez sélectionner un jeu"),
  tournament_typesId: z.string().min(1, "Veuillez sélectionner un type de tournoi"),
  format: z.string().min(1, "Le format est requis"),
  rules: z.string().optional(),
  maxParticipants: z.string().min(1, "Le nombre maximum de participants est requis"),
  rewards: z.string().optional(),
  numTeams: z.string().min(1, "Le nombre d'équipes est requis"),
  playersPerTeam: z.string().min(1, "Le nombre de joueurs par équipe est requis"),
  totalPlayers: z.string(),
});

export default function TournamentForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      rules: "",
      rewards: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [games, setGames] = useState([]);
  const [tournamentTypes, setTournamentTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [gamesRes, typesRes] = await Promise.all([
          fetch("/api/games"),
          fetch("/api/tournament_types"),
        ]);
        
        if (!gamesRes.ok || !typesRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const [gamesData, typesData] = await Promise.all([
          gamesRes.json(),
          typesRes.json(),
        ]);

        setGames(gamesData);
        setTournamentTypes(typesData);
      } catch (error) {
        setError("Erreur lors du chargement des données: " + error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const numTeams = parseInt(watch("numTeams") || "0");
    const playersPerTeam = parseInt(watch("playersPerTeam") || "0");
    setValue("totalPlayers", (numTeams * playersPerTeam).toString());
  }, [watch("numTeams"), watch("playersPerTeam"), setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de la création du tournoi");
      }

      router.push("/tournaments"); // Redirection après succès
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-4 bg-red-50 text-red-600 rounded">
        {error}
      </div>
    );
  }

  return (
    <Card className="max-w-lg mx-auto mt-10 p-6 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Créer un tournoi</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("tournamentName")}
              placeholder="Nom du tournoi"
              className={errors.tournamentName ? "border-red-500" : ""}
            />
            {errors.tournamentName && (
              <p className="text-red-500 text-sm mt-1">{errors.tournamentName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="date"
                {...register("startDate")}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
              )}
            </div>
            <div>
              <Input
                type="time"
                {...register("startTime")}
                className={errors.startTime ? "border-red-500" : ""}
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <select
              {...register("gameId")}
              className={`w-full p-2 border rounded ${
                errors.gameId ? "border-red-500" : ""
              }`}
            >
              <option value="">Sélectionner un jeu</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
            {errors.gameId && (
              <p className="text-red-500 text-sm mt-1">{errors.gameId.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("tournament_typesId")}
              className={`w-full p-2 border rounded ${
                errors.tournament_typesId ? "border-red-500" : ""
              }`}
            >
              <option value="">Sélectionner un type de tournoi</option>
              {tournamentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
            {errors.tournament_typesId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tournament_typesId.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register("format")}
              placeholder="Format (ex: Élimination directe)"
              className={errors.format ? "border-red-500" : ""}
            />
            {errors.format && (
              <p className="text-red-500 text-sm mt-1">{errors.format.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("rules")}
              placeholder="Règles (optionnel)"
            />
          </div>

          <div>
            <Input
              type="number"
              {...register("maxParticipants")}
              placeholder="Nombre maximum de participants"
              className={errors.maxParticipants ? "border-red-500" : ""}
            />
            {errors.maxParticipants && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxParticipants.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register("rewards")}
              placeholder="Récompenses (optionnel)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                {...register("numTeams")}
                placeholder="Nombre d'équipes"
                className={errors.numTeams ? "border-red-500" : ""}
              />
              {errors.numTeams && (
                <p className="text-red-500 text-sm mt-1">{errors.numTeams.message}</p>
              )}
            </div>
            <div>
              <Input
                type="number"
                {...register("playersPerTeam")}
                placeholder="Joueurs par équipe"
                className={errors.playersPerTeam ? "border-red-500" : ""}
              />
              {errors.playersPerTeam && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.playersPerTeam.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              type="number"
              {...register("totalPlayers")}
              placeholder="Total joueurs"
              readOnly
              className="bg-gray-100"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer le tournoi"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
