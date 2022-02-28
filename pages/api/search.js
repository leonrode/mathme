import { generateSearchResults } from "./utils";

import { getSession } from "next-auth/react";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send();
  }

  try {
    const prompt = req.query.prompt;

    const searchResults = generateSearchResults(prompt);
    return res.json({ error: false, results: searchResults });
  } catch (e) {
    return res.json({ error: true, error: e.message });
  }
}
export default handler;
