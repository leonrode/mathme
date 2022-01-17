import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { randomId } from "../utils";
async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }
  const { userId } = session;
  const { title, topics } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = { _id: new ObjectId(userId) };

  const playlistId = randomId();
  const playlistObject = {
    title: title,
    id: playlistId,
    topics: topics,
    creator: new ObjectId(userId),
    createdAt: Date.now(),
  };

  const operation = { $push: { playlists: playlistObject } };

  await db.collection("users").updateOne(filter, operation);

  res.json({ playlistId: playlistId });
}

export default handler;
