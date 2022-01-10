import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) return res.status(403).send();

  const { userId } = req.query;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = {
    _id: new ObjectId(userId),
  };

  const user = await db.collection("users").findOne(filter);

  return res.json({ avatarUrl: user.image });
}

export default handler;
