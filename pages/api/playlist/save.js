import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }

  const { playlistSlug, title, topics } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = { slug: playlistSlug };
  const operation = { $set: { topics: topics, title: title } };

  await db.collection("playlists").updateOne(filter, operation);

  res.json({ playlistSlug });
}

export default handler;
