import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }
  const { playlistId } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  // const filter = {
  //   _id: new ObjectId(playlistId),
  // };
  const filter = {
    slug: playlistId,
  };
  const result = await db.collection("playlists").deleteOne(filter);

  res.status(201).send();
}

export default handler;
