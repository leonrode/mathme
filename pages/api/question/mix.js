import content from "../../../lib/content/content";
import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  const { playlistSlug, count } = req.query;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const filter = { slug: playlistSlug };

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

      // get one question from the topic id
      try {
        const { latex, stringVersion, solution, instructions, prompts } =
          content[topic.topic.id].generate();
        questions.push({
          latex: latex,
          stringVersion,
          solution,
          instructions,
          prompts,

          title: content[topic.topic.id].title,

          numFields: content[topic.topic.id].numFields,

          buttons: content[topic.topic.id].buttons,
        });
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    // choose random topic

    const topic = topics[Math.floor(Math.random() * topics.length)];

    // get one question from the topic id
    const { latex, stringVersion, solution, instructions, prompts } =
      content[topic.topic.id].generate();

    questions.push({
      latex: latex,
      stringVersion,
      solution,
      instructions,
      prompts,

      title: content[topic.topic.id].title,

      numFields: content[topic.topic.id].numFields,

      buttons: content[topic.topic.id].buttons,
    });
  }

  return res.json({ error: false, questions: questions });
}

export default handler;
