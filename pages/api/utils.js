import content from "./content";

import stringSimilarity from "string-similarity";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdefABCDEF", 24);

function fetchMeta(topicId) {
  const { title, example } = content[topicId];
  return { title, example };
}

function verifyProblem(topicId, problem, response, stringVersion) {
  return content[topicId].verify(problem, response, stringVersion);
}

function generateSearchResults(prompt) {
  if (prompt === "all") {
    return content.map((topic, index) => ({
      id: index,
      instructions: topic.instructions,
      title: topic.title,
      description: topic.description,
      example: topic.example,
      tags: topic.tags,
      numFields: topic.numFields,
      prompts: topic.prompts,
    }));
  }
  let results = content.map((topic, index) => ({
    id: index,
    instructions: topic.instructions,
    title: topic.title,
    description: topic.description,
    example: topic.example,
    tags: topic.tags,
    numFields: topic.numFields,
    prompts: topic.prompts,
    rating: stringSimilarity.compareTwoStrings(prompt, topic.title),
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

function randomId() {
  return nanoid();
}

export {
  verifyProblem,
  fetchMeta,
  generateSearchResults,
  randomIntInRange,
  randomId,
};
