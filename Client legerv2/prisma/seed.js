const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed tournament types
  const tournamentTypes = await prisma.tournament_types.createMany({
    data: [
      { type: 'Pro' },
      { type: 'Semi Pro' },
      { type: 'Amateur' },
      { type: 'Débutant' },
      { type: 'Fun' },
    ],
    skipDuplicates: true, // Skip if they already exist
  });

  console.log('Tournament types created:', tournamentTypes);

  // Seed games with tournament types
  const games = await prisma.game.createMany({
    data: [
      { name: 'Game 1', tournamentTypeId: 1 }, // Associate 'Game 1' with 'Pro'
      { name: 'Game 2', tournamentTypeId: 2 }, // Associate 'Game 2' with 'Semi Pro'
      { name: 'Game 3', tournamentTypeId: 3 }, // Associate 'Game 3' with 'Amateur'
      { name: 'Game 4', tournamentTypeId: 4 }, // Associate 'Game 4' with 'Débutant'
      { name: 'Game 5', tournamentTypeId: 5 }, // Associate 'Game 5' with 'Fun'
    ],
    skipDuplicates: true, // Skip if they already exist
  });

  console.log('Games created:', games);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
