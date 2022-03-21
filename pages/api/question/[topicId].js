import content from "../content";

function handler(req, res) {
  const topicId = req.query.topicId;
  const count = req.query.count;
  try {
    if (count) {
      const topic = content.filter((topic) => topic.id === ~~topicId)[0];
      if (!topic) {
        return res.status(400).send();
      }
      let questions = [];
      for (let i = 0; i < count; i++) {
        const { latex, stringVersion, solution } = topic.generate();

        questions.push({
          latex: latex,
          stringVersion,
          solution,

          title: topic.title,
          instructions: topic.instructions,
          numFields: topic.numFields,
          prompts: topic.prompts,
          buttons: topic.buttons,
        });
      }

      return res.json({
        questions: questions,
        warning: "Yes, you can see the solution, but that defeats the point :)",
      });
    } else {
      const topic = content.filter((topic) => topic.id === ~~topicId)[0];
      if (!topic) {
        return res.status(400).send();
      }
      const { latex, stringVersion, solution } = topic.generate();

      return res.json({
        latex: latex,
        stringVersion,
        solution,

        title: topic.title,
        instructions: topic.instructions,
        numFields: topic.numFields,
        prompts: topic.prompts,
        buttons: topic.buttons,
        warning: "Yes, you can see the solution, but that defeats the point :)",
      });
    }
  } catch (e) {
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
