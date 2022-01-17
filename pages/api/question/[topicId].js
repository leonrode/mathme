import content from "../content";

function handler(req, res) {
  const topicId = req.query.topicId;

  try {
    const { prompt, latex, stringVersion } = content[topicId].generate();

    return res.json({
      latex: latex,
      stringVersion,
      title: content[topicId].title,
      instructions: content[topicId].instructions,
      numFields: content[topicId].numFields,
      prompts: content[topicId].prompts,
    });
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
