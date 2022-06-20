import content from "./content";
import {
  POS_COMPOSITES,
  ALL_COMPOSITES,
  POS_PRIMES,
  ALL_PRIMES,
  POS_SQUARES,
  ALL_SQUARES,
} from "./sets";
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

function randomCompositeNumber(min, max, excludeValues) {
  let num = ALL_COMPOSITES[Math.floor(Math.random() * ALL_COMPOSITES.length)];
  while (num < min || num > max || excludeValues.includes(num)) {
    num = ALL_COMPOSITES[Math.floor(Math.random() * ALL_COMPOSITES.length)];
  }
  return num;
}

function randomPrimeNumber(min, max, excludeValues) {
  let num = ALL_PRIMES[Math.floor(Math.random() * ALL_PRIMES.length)];
  while (num < min || num > max || excludeValues.includes(num)) {
    num = ALL_PRIMES[Math.floor(Math.random() * ALL_PRIMES.length)];
  }
  return num;
}

function randomSquare(min, max, excludeValues) {
  let num = POS_SQUARES[Math.floor(Math.random() * POS_SQUARES.length)];
  while (
    (min && num < min) ||
    (max && num > max) ||
    excludeValues?.includes(num)
  ) {
    num = POS_SQUARES[Math.floor(Math.random() * POS_SQUARES.length)];
  }
  return num;
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

function randomFactorOfNumber(number) {
  let factors = [];

  if (number > 0) {
    for (let i = 2; i <= number; i++) {
      if (number % i === 0) factors.push(i);
    }
  } else {
    for (let i = number; i < -2; i++) {
      if (-number % -i === 0) factors.push(i);
    }
  }

  return factors[Math.floor(Math.random() * factors.length)];
}

const OPS = ["ADD", "SUB", "MULT", "DIV"];

function randomOp() {
  return OPS[Math.floor(Math.random() * OPS.length)];
}

function randomMultOrDiv() {
  return ["MULT", "DIV"][Math.floor(Math.random() * 2)];
}

function randomAddOrSub() {
  return ["ADD", "SUB"][Math.floor(Math.random() * 2)];
}

function oppositeOp(op) {
  switch (op) {
    case "ADD":
      return "SUB";
    case "SUB":
      return "ADD";
    case "DIV":
      return "MULT";
    case "MULT":
      return "DIV";
  }
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

function randomize(lhs, rhs) {
  const NUM_WAYS = 2;
  const choice = Math.floor(Math.random() * NUM_WAYS);
  if (choice === 0) {
    return { lhs: rhs, rhs: lhs };
  } else {
    return { lhs: lhs, rhs: rhs };
  }
}

export {
  verifyQuestion,
  fetchMeta,
  randomIntInRange,
  gcd,
  randomFactor,
  replaceAll,
  randomFactorOfNumber,
  randomCompositeNumber,
  randomPrimeNumber,
  randomSquare,
  OPS,
  randomOp,
  randomMultOrDiv,
  randomAddOrSub,
  oppositeOp,
  performOp,
  randomize,
};
