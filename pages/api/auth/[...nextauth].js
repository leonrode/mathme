import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

const options = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
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
