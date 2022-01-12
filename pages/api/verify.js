import { verifyProblem } from "./utils";

function handler(req, res) {
  const { topicId, questionLatex, responseFields, questionString } = req.body;

  if (verifyProblem(topicId, questionLatex, responseFields, questionString)) {
    console.log("right");
    return res.json({ error: false, isCorrect: true });
  } else {
    console.log("wrong");
    return res.json({ error: false, isCorrect: false });
  }
}

export default handler;
