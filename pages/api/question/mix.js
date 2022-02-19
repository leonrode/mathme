import content from "../content";
import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  const playlistId = req.query.playlistId;
  const count = req.query.count;
  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = { slug: playlistId };

  const playlist = await db.collection("playlists").findOne(filter);

  if (!playlist) {
    return res.json({ error: true, message: "No playlist found" });
  }

  const topics = playlist.topics;

  let questions = [];
  if (count) {
    for (let i = 0; i < count; i++) {
      // choose random topic

      const topic = topics[Math.floor(Math.random() * topics.length)];

      // get one problem from the topic id
      const { latex, stringVersion, solution } =
        content[topic.topic.id].generate();

      questions.push({
        latex: latex,
        stringVersion,
        solution,

        title: content[topic.topic.id].title,
        instructions: content[topic.topic.id].instructions,
        numFields: content[topic.topic.id].numFields,
        prompts: content[topic.topic.id].prompts,
        buttons: content[topic.topic.id].buttons,
      });
    }
  } else {
    // choose random topic

    const topic = topics[Math.floor(Math.random() * topics.length)];

    // get one problem from the topic id
    const { latex, stringVersion, solution } =
      content[topic.topic.id].generate();

    questions.push({
      latex: latex,
      stringVersion,
      solution,

      title: content[topic.topic.id].title,
      instructions: content[topic.topic.id].instructions,
      numFields: content[topic.topic.id].numFields,
      prompts: content[topic.topic.id].prompts,
      buttons: content[topic.topic.id].buttons,
    });
  }

  return res.json({ error: false, questions: questions });
}

export default handler;
