import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db/prisma";

export const config = {
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        if (user && user.password) {
          const isMatch = await compareSync(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      if (trigger === "update" && session) {
        token.name = session.name || token.name;
        token.image = session.image || token.image;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
