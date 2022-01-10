import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) return res.status(403).send();

  const { userId } = session;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = {
    _id: new ObjectId(userId),
  };
  const user = await db.collection("users").findOne(filter);
  if (!user.playlists) res.json({ playlists: [] });
  return res.json({ playlists: user.playlists });
}

export default handler;
