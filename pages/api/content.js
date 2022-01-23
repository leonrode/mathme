import nerdamer from "nerdamer/all";
import algebra from "algebra.js";
import Algebrite from "algebrite";
import { randomIntInRange } from "./utils";

const oneStepLinear = {
  id: 0,
  instructions: "Solve for x",
  title: "Solve one step linear equations",
  description: "Solve very basic linear equations.",
  example: "x+17=34",
  tags: ["Algebra I"],
  numFields: 1,
  prompts: ["x ="],

  generate: () => {
    const solution = randomIntInRange(-10, 10, [0]);
    const symbol = "x";
    let lhs = nerdamer(symbol);
    let rhs = nerdamer(solution);

    let value = randomIntInRange(-20, 20, [0]);

    lhs = lhs.add(value);
    rhs = rhs.add(value);

    const latex = lhs.toTeX() + "=" + rhs.toTeX();
    return { solution, latex };
  },
  verify: (question, userResponse) => {
    const n_question = nerdamer.convertFromLaTeX(question);
    const n_response = nerdamer.convertFromLaTeX(userResponse);

    const solutions = n_question.solveFor("x");
    return n_response.eq(solutions);
  },
};

const twoStepLinear = {
  id: 1,
  title: "Solve two step linear equations",
  instructions: "Solve for x",
  description: "Solve more complex linear equations",
  example: "2(x+5)=10",
  tags: ["Algebra I", "Linear Equations"],
  numFields: 1,
  prompts: ["x ="],

  generate: () => {
    const solution = randomIntInRange(-20, 20, [0]);
    const symbol = "x";

    let lhs = nerdamer(symbol);
    let rhs = nerdamer(solution);

    let value = randomIntInRange(-50, 50, [0]);

    lhs = lhs.add(value);
    rhs = rhs.add(value);

    value = randomIntInRange(-10, 10, [0, 1, -1]);

    lhs = lhs.multiply(value);
    rhs = rhs.multiply(value);

    const latex = lhs.toTeX() + "=" + rhs.toTeX();

    return { latex };
  },

  verify: (question, userResponse) => {
    const n_question = nerdamer.convertFromLaTeX(question);
    const n_response = nerdamer.convertFromLaTeX(userResponse);

    const solutions = n_question.solveFor("x");
    return n_response.eq(solutions);
  },
};

const twoStepLinearSimplified = {
  id: 2,
  title: "Solve multi-step linear equations",
  instructions: "Solve for x",
  description: "Solve multi-step linear equations",
  example: "2x+10=50",
  tags: ["Algebra I", "Linear Equations"],
  numFields: 1,
  prompts: ["x ="],

  generate: () => {
    const solution = randomIntInRange(-20, 20, [0]);
    const symbol = "x";

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
    return { latex, stringVersion: lhs.toString() };
  },
  verify: (question, userResponse) => {
    const n_question = nerdamer.convertFromLaTeX(question);
    const n_response = nerdamer.convertFromLaTeX(userResponse);

    const solutions = n_question.solveFor("x");
    return n_response.eq(solutions);
  },
};

const factorQuadraticAOne = {
  id: 3,
  title: "Factor quadratics where a = 1",
  instructions: "Factor the quadratic",
  descrption: "Factor basic quadratics into binomials",
  example: "x^2 + 5x + 6",
  tags: ["Quadratics", "Algebra I"],
  numFields: 1,
  prompts: ["="],

  generate: () => {
    const symbol = "x";

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
    return { latex, stringVersion: lhs.toString() };
  },

  verify: (question, userResponse) => {
    let n_question = nerdamer.convertFromLaTeX(question);
    let n_response = nerdamer.convertFromLaTeX(userResponse);

    n_response = n_response.expand();

    return n_question.eq(n_response);
  },
};

const factorQuadratic = {
  id: 4,
  title: "Factor quadratics where a does not equal 1",
  instructions: "Factor the quadratic",
  description: "Factor a quadratic where a does not equal 1",
  example: "2x^2+10x+12",
  tags: ["Quadratics", "Algebra I", "Factoring"],
  numFields: 1,
  prompts: ["="],

  generate: () => {
    const symbol = "x";

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

    return { latex, stringVersion: lhs.toString() };
  },

  verify: (question, userResponse) => {
    let n_question = nerdamer.convertFromLaTeX(question);
    let n_response = nerdamer.convertFromLaTeX(userResponse);
    n_response = n_response.expand();
    return n_question.eq(n_response);
  },
};

const simplifyRationalExpression = {
  id: 5,
  title: "Simplify Rational Expressions",
  instructions: "Simplify the rational expression",
  descrption: "Simplify more complex rational expresions",
  example: "\\frac{x^3-7x^2+12x}{2x^2-8x}",
  tags: ["Rational Expressions", "Algebra II"],
  numFields: 1,
  prompts: ["="],

  generate: () => {
    const symbol = "x";

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
    return { latex, stringVersion: final.toString() };
  },

  verify: (question, userResponse, questionString) => {
    // console.log(question, userResponse, questionString);
    // const questionResult = Algebrite.simplify(questionString);
    // const userResult = Algebrite.simplify(
    //   nerdamer.convertFromLaTeX(userResponse).toString()
    // );
    // return questionResult.toString() === userResult.toString();

    let ok = false;
    const qN = nerdamer(questionString);
    const rN = nerdamer.convertFromLaTeX(userResponse);

    for (let i = -5; i < 5; i++) {
      const qE = qN.evaluate({ x: i });
      const rE = rN.evaluate({ x: i });
      if (qE.toString() !== rE.toString()) {
        // console.log(qe.toString(), rE.toString());
        ok = false;
      }
    }

    return ok;
  },
};

const multiplyRationalExpressions = {
  id: 6,
  title: "Multiply Rational Expressions",
  instructions: "Simplify the rational expression",
  descrption: "Multiply two rational expressions",
  example: "\\frac{4x+8}{4x^2-25}\\cdot\\frac{6x+15}{2x^2+4x}",
  tags: ["Rational Expressions", "Algebra II"],
  numFields: 1,
  prompts: ["="],

  generate: () => {
    const symbol = "x";

    let n1 = nerdamer(randomIntInRange(-10, 10, [0, 1, -1]));
    let n2 = nerdamer(randomIntInRange(-10, 10, [0, 1, -1]));

    let v0 = randomIntInRange(-5, 5, [0, 1, -1]);
    let v1 = randomIntInRange(-5, 5, [0, 1, -1]);
    let d1 = nerdamer(nerdamer(symbol).multiply(v0).add(v1));

    let d2 = nerdamer(
      nerdamer(symbol).multiply(randomIntInRange(-5, 5, [0, 1, -1]))
    );

    d1 = d1.multiply(nerdamer(symbol).multiply(v0).add(-v1));
    n2 = n2.multiply(nerdamer(symbol).multiply(v0).add(-v1));

    let v2 = randomIntInRange(-5, 5, [0, 1, -1]);
    n1 = n1.multiply(nerdamer(symbol).add(v2));
    d2 = d2.multiply(nerdamer(symbol).add(v2));

    n1 = n1.expand();
    n2 = n2.expand();

    d1 = d1.expand();
    d2 = d2.expand();

    let f1 = n1.divide(d1);
    let f2 = n2.divide(d2);

    const f1Latex = f1.toTeX().replaceAll("\\cdot", "");
    const f2Latex = f2.toTeX().replaceAll("\\cdot", "");

    const latex = `${f1Latex}\\cdot${f2Latex}`;
    const stringVersion = nerdamer.convertFromLaTeX(latex).toString();

    return { latex, stringVersion: stringVersion };
  },

  verify: (question, userResponse, questionString) => {
    let ok = true;
    const q = nerdamer(questionString);
    const r = nerdamer.convertFromLaTeX(userResponse);
    for (let i = -100; i < 100; i++) {
      try {
        const qE = q.evaluate({ x: i }).toString();
        const rE = r.evaluate({ x: i }).toString();
        if (qE !== rE) {
          console.log(qE, rE);
          ok = false;
        }
      } catch (e) {}
    }

    return ok;
  },
};

const simplifyRationalExpression2 = {
  id: 7,
  title: "(II) Simplify Rational Expressions",
  instructions: "Simplify the rational expression",
  descrption: "Divide two rational expressions",
  example: "\\frac{x^3-2x^2-15x}{3x^2-15x}",
  tags: ["Rational Expressions", "Algebra II"],
  numFields: 1,
  prompts: ["="],

  generate: () => {
    const symbol = "x";

    let n = nerdamer(symbol).add(randomIntInRange(-5, 5, [0, 1, -1]));
    let d = randomIntInRange(-5, 5, [0, -1, 1]);

    d = nerdamer(symbol).multiply(d);
    let v0 = randomIntInRange(-5, 5, [0, -1, 1]);
    n = n.multiply(symbol).multiply(nerdamer(symbol).add(v0));
    d = d.multiply(nerdamer(symbol).add(v0));

    const nL = n.expand().toTeX().replaceAll("\\cdot", " ");
    const dL = d.expand().toTeX().replaceAll("\\cdot", " ");

    const latex = `\\frac{${nL}}{${dL}}`;

    const stringVersion = nerdamer.convertFromLaTeX(latex).toString();

    return { latex, stringVersion: stringVersion };
  },

  verify: (question, userResponse, questionString) => {
    let ok = true;
    // console.log(questionString);
    const q = nerdamer(questionString);
    console.log(userResponse);
    const r = nerdamer.convertFromLaTeX(userResponse);

    for (let i = -10; i < 10; i++) {
      try {
        const qE = q.evaluate({ x: i }).toString();
        const rE = r.evaluate({ x: i }).toString();
        if (qE !== rE) {
          console.log(qE, rE, i);
          ok = false;
        }
      } catch (e) {}
    }

    return ok;
  },
};

const absoluteValueEquations = {
  id: 8,
  title: "Absolute Value Equations",
  instructions: "Solve for x",
  descrption: "Simplify rational expressions",
  example: "|x+5|=7",
  numFields: 2,
  prompts: ["x_1=", "x_2="],
  tags: ["Absolute Value", "Algebra II"],

  generate: () => {
    const symbol = "x";

    const o = randomIntInRange(0, 20);

    const lhs = nerdamer.abs(nerdamer(symbol).add(randomIntInRange(-10, 10)));

    const rhs = nerdamer(o);

    const latex = `${lhs.toTeX()}=${rhs.toTeX()}`;
    // console.log(latex);
    const stringVersion = nerdamer(
      `${lhs.toString()}=${rhs.toString()}`
    ).toString();
    // console.log(nerdamer.abs("x+4").toTeX());
    console.log(stringVersion);
    return { latex, stringVersion };
  },

  verify: (question, userResponses, questionString) => {
    const solutions = nerdamer.solve(questionString, "x");

    const evalled = eval(solutions.toString());
    let ok = true;
    for (const value of evalled) {
      if (!userResponses.includes(value.toString())) {
        ok = false;
      }
    }

    return ok;
  },
};

export default [
  oneStepLinear,
  twoStepLinear,
  twoStepLinearSimplified,
  factorQuadraticAOne,
  factorQuadratic,
  simplifyRationalExpression,
  multiplyRationalExpressions,
  simplifyRationalExpression2,
  absoluteValueEquations,
];
