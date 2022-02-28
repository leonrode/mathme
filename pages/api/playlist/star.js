import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) return res.status(403).send();

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const { playlistSlug } = req.body;

  const filter = {
    slug: playlistSlug,
  };

  const playlist = await db.collection("playlists").findOne(filter);
  if (!playlist) return res.status(400).send();
  await db
    .collection("playlists")
    .updateOne(filter, { $set: { isStarred: !playlist.isStarred } });

  return res.status(201).send();
}

export default handler;
