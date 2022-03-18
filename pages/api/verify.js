import { verifyQuestion } from "./utils";

function handler(req, res) {
  const { topicId, questionLatex, responseFields, questionString, providedSolution } = req.body;

  if (verifyQuestion(topicId, questionLatex, responseFields, questionString, providedSolution)) {
    return res.json({ error: false, isCorrect: true });
  } else {
    return res.json({ error: false, isCorrect: false });
  }
}

export default handler;
