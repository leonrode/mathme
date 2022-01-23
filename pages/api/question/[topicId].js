import content from "../content";

function handler(req, res) {
  const topicId = req.query.topicId;
  const count = req.query.count;
  try {
    if (count) {
      let questions = [];
      for (let i = 0; i < count; i++) {
        const { latex, stringVersion, solution } = content[topicId].generate();
        questions.push({
          latex: latex,
          stringVersion,
          solution,

          title: content[topicId].title,
          instructions: content[topicId].instructions,
          numFields: content[topicId].numFields,
          prompts: content[topicId].prompts,
        });
      }
      return res.json({
        questions: questions,
        warning: "Yes, you can see the solution, but that defeats the point :)",
      });
    } else {
      const { latex, stringVersion, solution } = content[topicId].generate();

      return res.json({
        latex: latex,
        stringVersion,
        solution,

        title: content[topicId].title,
        instructions: content[topicId].instructions,
        numFields: content[topicId].numFields,
        prompts: content[topicId].prompts,
        warning: "Yes, you can see the solution, but that defeats the point :)",
      });
    }
  } catch (e) {
    console.log(e);
    return res.json({
      isError: true,
      error: e.message,
      stack: e.stack,
      file: e.fileName,
      line: e.lineNumber,
    });
  }
}

export default handler;
