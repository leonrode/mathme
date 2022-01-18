import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { randomId } from "../utils";
async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }

  const { playlistId, title, topics } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = { _id: new ObjectId(playlistId) };

  const operation = { $set: { topics: topics, title: title } };

  await db.collection("playlists").updateOne(filter, operation);

  res.json({ playlistId: playlistId });
}

export default handler;
