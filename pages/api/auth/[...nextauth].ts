import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: String;
          password: String;
        };

        const user = await prisma.user.findFirst({
          where: {
            email: email as string,
          },
        });

        if (user) {
          let result = await bcrypt.compare(password as string, user.password);
          if (result) {
            return user;
          } else {
            throw new Error('invalid email or password');
          }
        } else {
          throw new Error('invalid email or password');
        }
      },
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async jwt(params) {
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      return params.token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.role = token?.role;
      }
      return session;
    },
  },
});
