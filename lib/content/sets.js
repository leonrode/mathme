const POS_COMPOSITES = [
  4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32,
  33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56,
  57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75, 76, 77, 78, 80, 81,
  82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99, 100,
];

const ALL_COMPOSITES = POS_COMPOSITES.reduce((acc, cur) => {
  acc.push(cur, -cur);
  return acc;
}, []);

const POS_PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
];

const ALL_PRIMES = POS_PRIMES.reduce((acc, cur) => {
  acc.push(cur, -cur);
  return acc;
}, []);

const POS_SQUARES = [4, 9, 16, 25, 36, 49, 64, 81, 100];

const ALL_SQUARES = POS_SQUARES.reduce((acc, cur) => {
  acc.push(cur, -cur);
  return acc;
}, []);

const SYMBOLS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "k",
  "m",
  "n",
  "p",
  "q",
  "r",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export {
  POS_COMPOSITES,
  ALL_COMPOSITES,
  POS_PRIMES,
  ALL_PRIMES,
  POS_SQUARES,
  ALL_SQUARES,
  SYMBOLS,
};
