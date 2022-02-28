import { verifyQuestion } from "./utils";

function handler(req, res) {
  const { topicId, questionLatex, responseFields, questionString } = req.body;

  if (verifyQuestion(topicId, questionLatex, responseFields, questionString)) {
    return res.json({ error: false, isCorrect: true });
  } else {
    return res.json({ error: false, isCorrect: false });
  }
}

export default handler;
