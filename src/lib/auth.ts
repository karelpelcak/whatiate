import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      // Přidej id uživatele do session
      if (session.user) {
        (session.user as User & { id?: string }).id = token.sub as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
