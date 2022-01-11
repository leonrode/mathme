import { verifyProblem } from "./utils";

function handler(req, res) {
  const { topicId, questionLatex, userResponse, questionString } = req.body;

  if (verifyProblem(topicId, questionLatex, userResponse, questionString)) {
    console.log("right");
    return res.json({ error: false, isCorrect: true });
  } else {
    console.log("wrong");
    return res.json({ error: false, isCorrect: false });
  }
}

export default handler;
