import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) return res.status(403).send();

  const { userId } = session;
  const { playlistId } = req.query;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = {
    _id: new ObjectId(playlistId),
  };
  const playlist = await db.collection("playlists").findOne(filter);
  console.log(playlist);
  if (playlist) {
    return res.json({ playlist: playlist });
  }
  return res.status(404).send();
}

export default handler;
