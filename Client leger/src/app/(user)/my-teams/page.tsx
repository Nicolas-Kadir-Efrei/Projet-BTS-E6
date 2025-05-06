import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { AuthUser } from "@/lib/auth";

interface ExtendedSession {
  user: AuthUser;
}

export default async function MyTeamsPage() {
  const session = (await getServerSession(authOptions)) as ExtendedSession | null;
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  // Récupérer les équipes dont l'utilisateur est membre
  const teams = await prisma.teamMember.findMany({
    where: { userId: user.id },
    include: {
      team: true
    }
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mes équipes</h1>
      
      {teams.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">Vous n'êtes membre d'aucune équipe pour le moment.</p>
          <Link 
            href="/teams" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Parcourir les équipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((membership) => (
            <div key={membership.team.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{membership.team.teamName}</h2>
                <p className="text-gray-600 mb-4">Équipe #{membership.team.id}</p>
                <div className="flex justify-end">
                  <Link 
                    href={`/teams/${membership.team.id}`} 
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
