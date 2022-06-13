import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }
  const { userId } = session;
  const { questions } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  // add date to questions

  // console.log(questions);

  let mapped = questions.map((question) => ({
    ...question,
    dateSolved: new Date(),
  }));

  const filter = {
    _id: new ObjectId(userId),
  };

  const update = {
    $push: {
      completed_questions: {
        $each: mapped,
      },
    },
  };
  try {
    await db.collection("users").updateOne(filter, update);
    return res.status(201).send();
  } catch (e) {
    return res.status(500).send();
  }
}

export default handler;
