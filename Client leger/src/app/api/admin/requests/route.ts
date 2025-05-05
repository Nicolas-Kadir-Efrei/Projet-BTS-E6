import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET: Récupérer toutes les demandes de participation
export async function GET(req: NextRequest) {
  console.log("Début de la requête GET pour récupérer les demandes de participation (admin)");
  
  // Récupérer le token d'autorisation
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const token = authHeader.substring(7); // Enlever 'Bearer '
  
  try {
    // Vérifier et décoder le token
    const userData = verifyToken(token);
    
    if (!userData || !userData.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Vérifier si l'utilisateur est un admin
    const user = await prisma.user.findUnique({
      where: { id: Number(userData.id) },
      select: { role: true }
    });
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Récupérer toutes les demandes de participation
    const joinRequests = await prisma.joinRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            pseudo: true
          }
        },
        tournament: {
          select: {
            id: true,
            tournamentName: true,
            startDate: true,
            game: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: [
        { status: 'asc' }, // 'pending' vient avant 'accepted' et 'rejected' alphabétiquement
        { createdAt: 'desc' }
      ]
    });
    
    return NextResponse.json(joinRequests);
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes de participation:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
