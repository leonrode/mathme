import content from "./content";

function fetchMeta(topicId) {
  const { title, example } = content[topicId];
  return { title, example };
}

function verifyQuestion(
  topicId,
  question,
  response,
  stringVersion,
  providedSolution
) {
  return content
    .filter((q) => q.id === topicId)[0]
    .verify(question, response, stringVersion, providedSolution);
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

  for (let i = Math.floor(-number / 2); i < number / 2; i++) {
    if (number % i === 0) {
      factors.push(i);
    }
  }

  if (factors.length === 0) return null;

  return factors[Math.floor(Math.random() * factors.length)];
}

function replaceAll(string, search, replacement) {
  return string.split(search).join(replacement);
}

const OPS = ["ADD", "SUB", "MULT", "DIV"];

function randomOp() {
  return OPS[Math.floor(Math.random() * OPS.length)];
}

function performOp(op, left, right) {
  switch (op) {
    case "ADD":
      return left.add(right);
    case "SUB":
      return left.subtract(right);
    case "MULT":
      return left.multiply(right);
    case "DIV":
      return left.divide(right);
  }
}

export {
  verifyQuestion,
  fetchMeta,
  randomIntInRange,
  gcd,
  randomFactor,
  replaceAll,
  OPS,
  randomOp,
  performOp,
};
