import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// Jeux par défaut à ajouter
const defaultGames = [
  {
    name: "Counter-Strike 2",
    image_path: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg"
  },
  {
    name: "League of Legends",
    image_path: "https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg"
  },
  {
    name: "Valorant",
    image_path: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4a8c30e088e7720/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png"
  },
  {
    name: "Fortnite",
    image_path: "https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg"
  },
  {
    name: "Rocket League",
    image_path: "https://rocketleague.media.zestyio.com/rl_platform_keyart_2019.jpg"
  },
  {
    name: "FIFA 24",
    image_path: "https://image.api.playstation.com/vulcan/ap/rnd/202307/0710/1c3c0a9650f3ea751c6d9ce67c054977b6e3a784d1acbd0f.png"
  },
  {
    name: "Call of Duty: Warzone",
    image_path: "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/WZ-Season-Three-Announce-TOUT.jpg"
  },
  {
    name: "Dota 2",
    image_path: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_616x353.jpg"
  },
  {
    name: "Overwatch 2",
    image_path: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt0c376a5b28a1230e/62ea14bb6a3ea57265a0b7e6/ow2-beta-header-desktop.png"
  },
  {
    name: "Rainbow Six Siege",
    image_path: "https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/449KkV5gVmtP4LKZuOUV5v/ea1e3d7f68ed6c0086c85491be7328ac/r6s-seasons-y8s4-printscreen_1920x1080.jpg"
  }
];

// POST: Ajouter des jeux par défaut
export async function POST(req: NextRequest) {
  console.log("Début de la requête POST pour ajouter des jeux par défaut");
  
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
    
    // Vérifier combien de jeux existent déjà
    const existingGamesCount = await prisma.game.count();
    
    if (existingGamesCount > 0) {
      return NextResponse.json({ 
        message: `${existingGamesCount} jeux existent déjà dans la base de données.`,
        existingGames: existingGamesCount
      });
    }
    
    // Ajouter les jeux par défaut
    const createdGames = await Promise.all(
      defaultGames.map(async (game) => {
        // Vérifier si le jeu existe déjà
        const existingGame = await prisma.game.findFirst({
          where: { name: game.name }
        });
        
        if (existingGame) {
          return existingGame;
        }
        
        // Créer le jeu s'il n'existe pas
        return prisma.game.create({
          data: {
            name: game.name,
            image_path: game.image_path
          }
        });
      })
    );
    
    return NextResponse.json({
      message: `${createdGames.length} jeux ont été ajoutés avec succès.`,
      games: createdGames
    }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout des jeux par défaut:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
