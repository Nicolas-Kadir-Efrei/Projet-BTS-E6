import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TournamentForm } from "@/components/tournament-form";
import type { AuthUser } from "@/lib/auth";

interface ExtendedSession {
  user: AuthUser;
}

export default async function EditTournamentPage({ params }: { params: { id: string } }) {
  const session = (await getServerSession(authOptions)) as ExtendedSession | null;
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const tournament = await prisma.tournament.findUnique({
    where: { id: Number(params.id) },
    include: {
      game: true,
      tournamentType: true,
      status: true,
      createdBy: true
    }
  });

  if (!tournament) {
    redirect("/tournaments");
  }

  // Vérifier si l'utilisateur est le créateur ou un admin
  if (tournament.createdBy.id !== user.id && user.role !== "admin") {
    redirect("/tournaments");
  }

  // Récupérer les jeux et types de tournois pour le formulaire
  const games = await prisma.game.findMany();
  const tournamentTypes = await prisma.tournamentType.findMany();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Modifier le tournoi</h1>
      <TournamentForm
        games={games}
        tournamentTypes={tournamentTypes}
        initialData={tournament}
        isEditing={true}
      />
    </div>
  );
}
