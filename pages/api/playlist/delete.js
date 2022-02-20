import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }
  const { playlistSlug } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = {
    slug: playlistSlug,
  };
  const result = await db.collection("playlists").deleteOne(filter);

  res.status(201).send();
}

export default handler;
