import { getSession } from "next-auth/react";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getTopSolvedQuestions, getBestQuestion, getPercentCorrect } from "../utils";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }
  const { userId } = session;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  // add date to questions

  const filter = {
    _id: new ObjectId(userId),
  };

  try {
    const result = await db.collection("users").findOne(filter);
    const questions = result.completed_questions;

    if (!questions) {
      return res.status(404).send();
    }
    const mostSolvedQuestion = getTopSolvedQuestions(questions);
    const bestQuestion = getBestQuestion(questions);
    const correctPercentage = getPercentCorrect(questions);

    return res.json({ mostSolvedQuestion, correctPercentage: {percentage: correctPercentage, total: questions.length} });
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

export default handler;
