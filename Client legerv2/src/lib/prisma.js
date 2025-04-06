import { PrismaClient } from '@prisma/client';

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ['query'],
  });
}

prisma = global.prisma;

export default prisma;
