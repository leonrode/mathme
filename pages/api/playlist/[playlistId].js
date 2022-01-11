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
    _id: new ObjectId(userId),
  };
  const user = await db.collection("users").findOne(filter);
  if (user) {
    const matchedPlaylists = user.playlists.filter(
      (_playlist) => _playlist.playlistId === playlistId
    );

    if (matchedPlaylists.length === 0) res.json({ playlist: null });
    return res.json({ playlist: matchedPlaylists[0] });
  }
  return res.status(404);
}

export default handler;
