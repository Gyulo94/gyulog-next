import { SERVER_URL } from "@/lib/constants";
import { getServerSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(SERVER_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.backendTokens.refresh_token}`,
      },
    });

    console.log("refrershed");

    const response = await res.json();

    return {
      ...token,
      backendTokens: response,
    };
  } catch (error) {
    console.error("Failed to refresh token", error);
    return { ...token, errpr: "RefreshToken Error" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(`${SERVER_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (res.status === 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      if (trigger === "update" && session !== null) {
        const { email, name, profileImage } = session;
        // token의 정보를 업데이트
        token.user.email = email;
        token.user.name = name;
        token.user.profileImage = profileImage;
      }

      return await refreshToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/logout",
  },
} satisfies NextAuthOptions;

export const getServerAuthSession = () => getServerSession(authOptions);
