import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth';

const handler = NextAuth({
  ...authOptions,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Mot de passe incorrect');
        }

        // Mettre à jour last_auth
        await prisma.user.update({
          where: { id: user.id },
          data: { last_auth: new Date() }
        });

        return {
          id: user.id.toString(),  // Convertir en string pour NextAuth
          email: user.email,
          role: user.role,
          pseudo: user.pseudo
        } as AuthUser;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString(); // Convertir en string pour NextAuth
        token.email = user.email;
        token.role = user.role;
        token.pseudo = user.pseudo;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email as string,
          role: token.role as string,
          pseudo: token.pseudo as string
        };
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
