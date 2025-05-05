import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import JoinRequestSection from './JoinRequestSection';

interface TournamentPageProps {
  params: { id: string };
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  // Correction Next.js 15 : params.id peut être une Promise
  const id = typeof params.id === 'string' ? params.id : await params.id;
  const tournament = await prisma.tournament.findUnique({
    where: { id: Number(id) },
    include: {
      creator: true,
      game: true,
      tournamentType: true,
    },
  });

  if (!tournament) return notFound();

  const startDate = new Date(tournament.startDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{tournament.tournamentName}</h1>
        <p className="text-gray-600 mb-4">
          Créé par <span className="font-medium">{tournament.creator?.pseudo}</span>
        </p>
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
            Jeu : {tournament.game?.name}
          </span>
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2">
            Type : {tournament.tournamentType?.type}
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            Format : {tournament.format}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-medium">Date :</span> {startDate}<br />
          <span className="font-medium">Heure :</span> {tournament.startTime}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Règles du tournoi</h2>
          <p className="whitespace-pre-wrap text-gray-700">{tournament.rules}</p>
        </div>
        <JoinRequestSection tournamentId={tournament.id} creatorId={tournament.createdById} />
      </div>
    </div>
  );
}
