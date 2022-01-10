import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
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

  const playlistObject = {
    title: title,
    playlistId: uuidv4(),
    topics: topics,
    creator: new ObjectId(userId),
    createdAt: Date.now(),
  };

  const operation = { $push: { playlists: playlistObject } };

  await db.collection("users").updateOne(filter, operation);

  res.status(200).send();
}

export default handler;
