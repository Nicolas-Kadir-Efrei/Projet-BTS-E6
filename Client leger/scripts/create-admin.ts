import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@esport-tournois.com';
  const password = 'admin123';
  const pseudo = 'Admin';
  const name = 'Administrator';
  const last_name = 'System';
  const sexe = 'X';  // X pour autre/non spécifié
  const birthday = new Date('1990-01-01');
  const last_auth = new Date();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'admin',
        pseudo,
        name,
        last_name,
        sexe,
        birthday,
        last_auth,
      },
      create: {
        email,
        password: hashedPassword,
        role: 'admin',
        pseudo,
        name,
        last_name,
        sexe,
        birthday,
        last_auth,
      },
    });

    console.log('Admin user created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
