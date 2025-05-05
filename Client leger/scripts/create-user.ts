const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'user@esport-tournois.com';
  const password = 'user123';
  const pseudo = 'User';
  const name = 'John';
  const last_name = 'Doe';
  const sexe = 'M';
  const birthday = new Date('1995-01-01');
  const last_auth = new Date();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'user',
        pseudo,
        name,
        last_name,
        sexe,
        birthday,
        last_auth,
      },
    });

    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
