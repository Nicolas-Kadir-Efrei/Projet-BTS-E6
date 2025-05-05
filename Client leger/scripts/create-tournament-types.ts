const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const tournamentTypes = [
      {
        type: 'SINGLE_ELIMINATION'
      },
      {
        type: 'DOUBLE_ELIMINATION'
      },
      {
        type: 'ROUND_ROBIN'
      }
    ];

    for (const type of tournamentTypes) {
      await prisma.tournamentType.create({
        data: type
      });
      console.log(`Created tournament type: ${type.type}`);
    }

  } catch (error) {
    console.error('Error creating tournament types:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
