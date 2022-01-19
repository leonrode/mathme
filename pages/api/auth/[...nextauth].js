import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "/lib/mongodb";
const options = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async (session, token, user) => {
      session.session.userId = session.user.id;
      return session.session;
    },
    // redirect({ url, baseUrl }) {
    //   if (url.startsWith(baseUrl)) return url;
    //   else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
    //   return baseUrl;
    // },
  },
  secret: process.env.AUTH_SECRET,
};

export default (req, res) => NextAuth(req, res, options);
