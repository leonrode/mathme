import content from "./content";

import stringSimilarity from "string-similarity";
function fetchMeta(topicId) {
  const { title, example } = content[topicId];
  return { title, example };
}

function verifyProblem(topicId, problem, response, stringVersion) {
  console.log(typeof topicId, "type");
  console.log(topicId, content[topicId]);
  return content[topicId].verify(problem, response, stringVersion);
}

function generateSearchResults(prompt) {
  if (prompt === "all") {
    return content.map((topic) => ({
      meta: topic.meta,
    }));
  }
  let results = content.map((topic) => ({
    meta: topic.meta,
    rating: stringSimilarity.compareTwoStrings(prompt, topic.meta.title),
  }));

  results = results.filter((result) => result.rating > 0.0);

  results.sort((a, b) => (a.rating < b.rating ? 1 : -1));

  return results;
}

function randomIntInRange(min, max, excludeValues) {
  let value = Math.floor(min + Math.random() * (max - min));

  while (excludeValues && excludeValues.includes(value)) {
    value = Math.floor(min + Math.random() * (max - min));
  }
  return value;
}

export { verifyProblem, fetchMeta, generateSearchResults, randomIntInRange };
