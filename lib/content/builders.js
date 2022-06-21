import { SYMBOLS } from "./sets";

import nerdamer from "nerdamer";
import {
  performOp,
  randomAddOrSub,
  randomIntInRange,
  replaceAll,
} from "./utils";

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function randomLinearTerm(coefMin, coefMax, coefExclude, symbol) {
  const coefficient = randomIntInRange(coefMin, coefMax, coefExclude);

  if (symbol) return nerdamer(coefficient + symbol);
  return nerdamer(coefficient + randomSymbol());
}

function randomQuadraticTerm(coefMin, coefMax, coefExclude, symbol) {
  const coefficient = randomIntInRange(coefMin, coefMax, coefExclude);

  if (symbol) return nerdamer(coefficient + symbol + "^2");
  return nerdamer(coefficient + randomSymbol() + "^2");
}

function randomQuadratic(aIsOne = False, symbol) {
  if (aIsOne) {
    let f1 = nerdamer(symbol);
    let f2 = nerdamer(symbol);

    f1 = performOp(randomAddOrSub(), f1, randomIntInRange(-10, 10, [0]));
    f2 = performOp(randomAddOrSub(), f2, randomIntInRange(-10, 10, [0]));

    return { factors: [f1, f2], quadratic: performOp("MULT", f1, f2).expand() };
  } else {
    let f1 = nerdamer(symbol);
    let f2 = nerdamer(symbol);

    f1 = performOp("MULT", f1, randomIntInRange(-5, 5, [0]));
    f2 = performOp("MULT", f2, randomIntInRange(-5, 5, [0]));

    f1 = performOp(randomAddOrSub(), f1, randomIntInRange(-10, 10, [0]));
    f2 = performOp(randomAddOrSub(), f2, randomIntInRange(-10, 10, [0]));

    return { factors: [f1, f2], quadratic: performOp("MULT", f1, f2).expand() };
  }
}

function buildLinearExpressionFromValue(symbol, symbolValue, hasToBeValue) {
  const diff = hasToBeValue - symbolValue;

  if (diff > 0) {
    return nerdamer(`${symbol} + ${diff}`);
  }
  return nerdamer(`${symbol} - ${Math.abs(diff)}`);
}

export {
  randomSymbol,
  randomLinearTerm,
  randomQuadraticTerm,
  randomQuadratic,
  buildLinearExpressionFromValue,
};
