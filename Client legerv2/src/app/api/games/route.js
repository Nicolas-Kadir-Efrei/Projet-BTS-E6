import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      select: {
        id: true,
        name: true
      }
    });
    
    return NextResponse.json(games);
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des jeux" },
      { status: 500 }
    );
  }
}
