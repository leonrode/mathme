import content from "../content";
async function handler(req, res) {
  if (req.method === "GET") {
    let list = [];

    for (const item of content) {
      if (!list.includes(item.category)) {
      }
    }
    content.map((item) => {
      list.push({
        id: item.id,
        title: item.title,
        category: item.category,
        subcategory: item.subcategory,
      });
    });

    return res.json({ content: list });
  }

  return res.status(404).send();
}

export default handler;
