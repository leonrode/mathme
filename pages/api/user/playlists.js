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
    creator: new ObjectId(userId),
  };

  const playlists = await db.collection("playlists").find(filter).toArray();

  if (!playlists) res.json({ playlists: [] });
  return res.json({ playlists }); // reverse for most-recent "created" (should be sorted by creation date)
}

export default handler;
