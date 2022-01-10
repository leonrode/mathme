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
  const { playlistId } = req.body;

  const client = await clientPromise;

  const db = client.db("myFirstDatabase");
  const filter = {
    _id: ObjectId(userId),
  };

  const updater = {
    $pull: {
      playlists: {
        playlistId: playlistId,
      },
    },
  };
  const result = db.collection("users").updateOne(filter, updater);

  res.status(201).send();
}

export default handler;
