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

  const playlistId = randomId();
  console.log(playlistId);
  const playlistObject = {
    title: title,
    _id: new ObjectId(),
    slug: playlistId,
    topics: topics,
    creator: new ObjectId(userId),
    createdAt: Date.now(),
    isStarred: false,
  };

  await db.collection("playlists").insertOne(playlistObject);

  res.json({ playlistId: playlistId });
}

export default handler;
