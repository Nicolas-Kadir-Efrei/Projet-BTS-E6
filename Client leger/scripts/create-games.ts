const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const games = [
      {
        name: 'League of Legends',
        image_path: 'https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg'
      },
      {
        name: 'Valorant',
        image_path: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4f39010c87c3f24/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png'
      },
      {
        name: 'Counter-Strike 2',
        image_path: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg'
      }
    ];

    for (const game of games) {
      await prisma.game.create({
        data: game
      });
      console.log(`Created game: ${game.name}`);
    }

  } catch (error) {
    console.error('Error creating games:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
