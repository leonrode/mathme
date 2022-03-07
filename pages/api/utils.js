import content from "./content";

import stringSimilarity from "string-similarity";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  12
);

function fetchMeta(topicId) {
  const { title, example } = content[topicId];
  return { title, example };
}

function verifyQuestion(topicId, question, response, stringVersion) {
  console.log(topicId);
  return content[topicId].verify(question, response, stringVersion);
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

function gcd(a, b) {
  if (!b) return Math.abs(a);

  return gcd(b, a % b);
}

function randomFactor(number) {
  let factors = [];
  console.log("n", number);
  for (let i = Math.floor(-number / 2); i < number / 2; i++) {
    console.log(i);
    if (number % i === 0) {
      factors.push(i);
    }
  }
  console.log("f", factors);
  console.log("t", -6 % -3, 0 === -0);
  if (factors.length === 0) return null;

  return factors[Math.floor(Math.random() * factors.length)];
}

function randomId() {
  return nanoid();
}

function replaceAll(string, search, replacement) {
  return string.split(search).join(replacement);
}

export {
  verifyQuestion,
  fetchMeta,
  generateSearchResults,
  randomIntInRange,
  gcd,
  randomFactor,
  randomId,
  replaceAll,
};
