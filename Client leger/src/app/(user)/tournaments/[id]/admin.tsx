import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import JoinRequestsAdmin from './JoinRequestsAdmin';

interface AdminPageProps {
  params: { id: string };
}

export default async function TournamentAdminPage({ params }: AdminPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;

  const tournament = await prisma.tournament.findUnique({
    where: { id: Number(params.id) },
    include: {
      joinRequests: { include: { user: true } },
    },
  });

  if (!tournament) return notFound();
  if (tournament.createdById !== userId) return notFound(); // only creator can access

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Gestion des demandes pour ce tournoi</h1>
        <JoinRequestsAdmin tournament={tournament} />
      </div>
    </div>
  );
}
