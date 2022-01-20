import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "/lib/mongodb";
const options = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async (session, token, user) => {
      session.session.userId = session.user.id;
      return session.session;
    },
    redirect: async ({ url, baseUrl }) => {
      return "/home";
    },
  },
  pages: {
    error: "/login",
  },
  secret: process.env.AUTH_SECRET,
};

export default (req, res) => NextAuth(req, res, options);
