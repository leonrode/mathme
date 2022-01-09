import { generateSearchResults } from "./utils";

function handler(req, res) {
  try {
    const prompt = req.query.prompt;

    const searchResults = generateSearchResults(prompt);
    return res.json({ error: false, results: searchResults });
  } catch (e) {
    return res.json({ error: true, error: e.message });
  }
}
export default handler;
