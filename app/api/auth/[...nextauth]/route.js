import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          // If no user found or password doesn't match
          if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            return null;
          }

          // Return user object without password
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role to token after sign in
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user role to client-side session
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };