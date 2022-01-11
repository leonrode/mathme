import nerdamer from "nerdamer/all";
import algebra from "algebra.js";
import Algebrite from "algebrite";
import { randomIntInRange } from "./utils";

const oneStepLinear = {
  meta: {
    id: 0,
    instructions: "Solve for x",
    title: "Solve one step linear equations",
    description: "Solve very basic linear equations.",
    example: "x+17=34",
    tags: ["Algebra I"],
  },

  generate: () => {
    const solution = randomIntInRange(-10, 10, [0]);
    const symbol = "x";
    const prompt = symbol + "=";
    let lhs = nerdamer(symbol);
    let rhs = nerdamer(solution);

    let value = randomIntInRange(-20, 20, [0]);

    lhs = lhs.add(value);
    rhs = rhs.add(value);

    const latex = lhs.toTeX() + "=" + rhs.toTeX();
    return { prompt, latex };
  },
  verify: (question, userResponse) => {
    const n_question = nerdamer.convertFromLaTeX(question);
    const n_response = nerdamer.convertFromLaTeX(userResponse);

    const solutions = n_question.solveFor("x");
    return n_response.eq(solutions);
  },
};

const twoStepLinear = {
  meta: {
    id: 1,
    title: "Solve two step linear equations",
    instructions: "Solve for x",
    description: "Solve more complex linear equations",
    example: "2(x+5)=10",
    tags: ["Algebra I", "Linear Equations"],
  },

  generate: () => {
    const solution = randomIntInRange(-20, 20, [0]);
    const symbol = "x";
    const prompt = symbol + "=";

    let lhs = nerdamer(symbol);
    let rhs = nerdamer(solution);

    let value = randomIntInRange(-50, 50, [0]);

    lhs = lhs.add(value);
    rhs = rhs.add(value);

    value = randomIntInRange(-10, 10, [0, 1, -1]);

    lhs = lhs.multiply(value);
    rhs = rhs.multiply(value);

    const latex = lhs.toTeX() + "=" + rhs.toTeX();

    return { latex, prompt };
  },

  verify: (question, userResponse) => {
    const n_question = nerdamer.convertFromLaTeX(question);
    const n_response = nerdamer.convertFromLaTeX(userResponse);

    const solutions = n_question.solveFor("x");
    return n_response.eq(solutions);
  },
};

const twoStepLinearSimplified = {
  meta: {
    id: 2,
    title: "Solve multi-step linear equations",
    instructions: "Solve for x",
    description: "Solve multi-step linear equations",
    example: "2x+10=50",
    tags: ["Algebra I", "Linear Equations"],
  },
  generate: () => {
    const solution = randomIntInRange(-20, 20, [0]);
    const symbol = "x";
    const prompt = symbol + "=";

    let lhs = nerdamer(symbol);
    let rhs = nerdamer(solution);

    let value = randomIntInRange(-50, 50, [0]);

    lhs = lhs.add(value);
    rhs = rhs.add(value);

    value = randomIntInRange(-10, 10, [0, 1, -1]);

    lhs = lhs.multiply(value);
    rhs = rhs.multiply(value);

    lhs = lhs.expand();

    let latex = lhs.toTeX() + "=" + rhs.toTeX();
    latex = latex.replace("\\cdot", "");
    return { latex, prompt, stringVersion: lhs.toString() };
  },
  verify: (question, userResponse) => {
    const n_question = nerdamer.convertFromLaTeX(question);
    const n_response = nerdamer.convertFromLaTeX(userResponse);

    const solutions = n_question.solveFor("x");
    return n_response.eq(solutions);
  },
};

const factorQuadraticAOne = {
  meta: {
    id: 3,
    title: "Factor quadratics where a = 1",
    instructions: "Factor the quadratic",
    descrption: "Factor basic quadratics into binomials",
    example: "x^2 + 5x + 6",
    tags: ["Quadratics", "Algebra I"],
  },

  generate: () => {
    const symbol = "x";
    const prompt = "=";

    const first = randomIntInRange(-10, 10, [0, 1, -1]);
    const second = randomIntInRange(-10, 10, [0, 1, -1]);

    let first_factor = nerdamer(symbol);
    let second_factor = nerdamer(symbol);

    first_factor = first_factor.add(first);
    second_factor = second_factor.add(second);

    let lhs = nerdamer(first_factor).multiply(second_factor);
    lhs = lhs.expand();
    let latex = lhs.toTeX();

    latex = latex.replace("\\cdot", "");
    return { prompt, latex, stringVersion: lhs.toString() };
  },

  verify: (question, userResponse) => {
    let n_question = nerdamer.convertFromLaTeX(question);
    let n_response = nerdamer.convertFromLaTeX(userResponse);

    n_response = n_response.expand();

    return n_question.eq(n_response);
  },
};

const factorQuadratic = {
  meta: {
    id: 4,
    title: "Factor quadratics where a does not equal 1",
    instructions: "Factor the quadratic",
    description: "Factor a quadratic where a does not equal 1",
    example: "2x^2+10x+12",
    tags: ["Quadratics", "Algebra I", "Factoring"],
  },

  generate: () => {
    const symbol = "x";
    const prompt = "=";

    const first = randomIntInRange(-10, 10, [0, 1, -1]);
    const second = randomIntInRange(-10, 10, [0, 1, -1]);

    let first_factor = nerdamer(symbol);
    let second_factor = nerdamer(symbol);

    let first_m = randomIntInRange(-5, 5, [0, 1]);

    first_factor = first_factor.multiply(first_m);

    first_factor = first_factor.add(first);
    second_factor = second_factor.add(second);

    let lhs = nerdamer(first_factor).multiply(second_factor);
    lhs = lhs.expand();
    let latex = lhs.toTeX();

    latex = latex.replaceAll("\\cdot", "");

    return { latex, prompt, stringVersion: lhs.toString() };
  },

  verify: (question, userResponse) => {
    let n_question = nerdamer.convertFromLaTeX(question);
    let n_response = nerdamer.convertFromLaTeX(userResponse);
    n_response = n_response.expand();
    return n_question.eq(n_response);
  },
};

const simplifyRationalExpression = {
  meta: {
    id: 5,
    title: "Simplify Rational Expressions",
    instructions: "Simplify the rational expression",
    descrption: "Simplify more complex rational expresions",
    example: "\\frac{x^3-7x^2+12x}{2x^2-8x}",
    tags: ["Rational Expressions", "Algebra II"],
  },
  generate: () => {
    const symbol = "x";
    const prompt = "=";
    let n = nerdamer(symbol);
    let d = nerdamer(randomIntInRange(-5, 5, [0, 1, -1]));

    n = n.add(randomIntInRange(-5, 5, [0, 1, -1]));
    n = n.multiply("x");
    d = d.multiply("x");

    let c = nerdamer(symbol);
    c = c.add(randomIntInRange(-5, 5, [0, 1, -1]));

    n = n.multiply(c);
    d = d.multiply(c);

    n = n.expand();
    d = d.expand();

    let final = n.divide(d);

    let latex = final.toTeX();
    latex = latex.replaceAll("\\cdot", "");
    return { latex, prompt, stringVersion: final.toString() };
  },

  verify: (question, userResponse, questionString) => {
    // console.log(question, userResponse, questionString);
    const questionResult = Algebrite.simplify(questionString);
    const userResult = Algebrite.simplify(
      nerdamer.convertFromLaTeX(userResponse).toString()
    );
    return questionResult.toString() === userResult.toString();
  },
};

export default [
  oneStepLinear,
  twoStepLinear,
  twoStepLinearSimplified,
  factorQuadraticAOne,
  factorQuadratic,
  simplifyRationalExpression,
];
