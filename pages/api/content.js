import nerdamer from "nerdamer/all";
import algebra from "algebra.js";
import Algebrite from "algebrite";
import { randomIntInRange, gcd, replaceAll } from "./utils";

export default [
  {
    instructions: "Solve for x",
    title: "Solve one step linear equations",
    description: "Solve very basic linear equations.",
    example: "x+17=34",
    tags: ["Algebra I"],
    numFields: 1,
    prompts: ["x ="],
    buttons: [],

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
  },
  {
    title: "Solve two step linear equations",
    instructions: "Solve for x",
    description: "Solve more complex linear equations",
    example: "2(x+5)=10",
    tags: ["Algebra I", "Linear Equations"],
    numFields: 1,
    prompts: ["x ="],
    buttons: [],
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

      return { solution, latex };
    },

    verify: (question, userResponses, questionString) => {
      const n_question = nerdamer.convertFromLaTeX(question);
      const n_response = nerdamer.convertFromLaTeX(userResponses[0]);

      const solutions = n_question.solveFor("x");
      return n_response.eq(solutions);
    },
  },
  {
    title: "Solve multi-step linear equations",
    instructions: "Solve for x",
    description: "Solve multi-step linear equations",
    example: "2x+10=50",
    tags: ["Algebra I", "Linear Equations"],
    numFields: 1,
    prompts: ["x ="],
    buttons: [],

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
      return { solution, latex, stringVersion: lhs.toString() };
    },
    verify: (question, userResponse) => {
      const n_question = nerdamer.convertFromLaTeX(question);
      const n_response = nerdamer.convertFromLaTeX(userResponse);

      const solutions = n_question.solveFor("x");
      return n_response.eq(solutions);
    },
  },
  {
    title: "Factor quadratics where a = 1",
    instructions: "Factor the quadratic",
    descrption: "Factor basic quadratics into binomials",
    example: "x^2 + 5x + 6",
    tags: ["Quadratics", "Algebra I"],
    numFields: 1,
    prompts: ["="],
    buttons: [],
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
      const solution = `(${first_factor})(${second_factor})`;
      return { solution, latex, stringVersion: lhs.toString() };
    },

    verify: (question, userResponse) => {
      let n_question = nerdamer.convertFromLaTeX(question);
      let n_response = nerdamer.convertFromLaTeX(userResponse);

      n_response = n_response.expand();

      return n_question.eq(n_response);
    },
  },
  {
    title: "Factor quadratics where a does not equal 1",
    instructions: "Factor the quadratic",
    description: "Factor a quadratic where a does not equal 1",
    example: "2x^2+10x+12",
    tags: ["Quadratics", "Algebra I", "Factoring"],
    numFields: 1,
    prompts: ["="],
    buttons: [],
    generate: () => {
      const symbol = "x";

      const first = randomIntInRange(-10, 10, [0, 1, -1]);
      const second = randomIntInRange(-10, 10, [0, 1, -1]);

      let first_factor = nerdamer(symbol);
      let second_factor = nerdamer(symbol);

      let first_m = randomIntInRange(-5, 5, [0, 1]);
      const before = first_factor;
      first_factor = first_factor.multiply(first_m);

      first_factor = first_factor.add(first);
      second_factor = second_factor.add(second);

      let lhs = nerdamer(first_factor).multiply(second_factor);
      lhs = lhs.expand();
      let latex = lhs.toTeX();

      // latex = latex.replaceAll("\\cdot", "");
      latex = replaceAll(latex, "\\cdot", "");
      const solution = `${first_m}(${before})(${second_factor})`;
      return { solution, latex, stringVersion: lhs.toString() };
    },

    verify: (question, userResponse) => {
      let ok = false;
      const qN = nerdamer.convertFromLaTeX(question);
      const rN = nerdamer.convertFromLaTeX(userResponse);

      for (let i = -5; i < 5; i++) {
        const qE = qN.evaluate({ x: i });
        const rE = rN.evaluate({ x: i });
        if (qE.toString() !== rE.toString()) {
          ok = false;
        }
      }

      return ok;
    },
  },
  {
    title: "Simplify Rational Expressions",
    instructions: "Simplify the rational expression",
    descrption: "Simplify more complex rational expresions",
    example: "\\frac{x^3-7x^2+12x}{2x^2-8x}",
    tags: ["Rational Expressions", "Algebra II"],
    numFields: 1,
    prompts: ["="],
    buttons: [],
    generate: () => {
      const symbol = "x";

      let n = nerdamer(symbol);
      let d = nerdamer(randomIntInRange(-5, 5, [0, 1, -1]));

      n = n.add(randomIntInRange(-5, 5, [0, 1, -1]));

      const solution = `\\frac{${n.toTeX()}}{${d.toTeX()}}`;

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
      // latex = latex.replaceAll("\\cdot", "");
      latex = replaceAll(latex, "\\cdot", "");
      return { solution, latex, stringVersion: final.toString() };
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
  },
  {
    title: "Multiply Rational Expressions",
    instructions: "Simplify the rational expression",
    descrption: "Multiply two rational expressions",
    example: "\\frac{4x+8}{4x^2-25}\\cdot\\frac{6x+15}{2x^2+4x}",
    tags: ["Rational Expressions", "Algebra II"],
    numFields: 1,
    prompts: ["="],
    buttons: [],
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

      const f1Latex = replaceAll(f1.toTeX(), "\\cdot", "");
      const f2Latex = replaceAll(f2.toTeX(), "\\cdot", "");

      const latex = `${f1Latex}\\cdot${f2Latex}`;
      const stringVersion = nerdamer.convertFromLaTeX(latex).toString();

      return {
        solution: "\\textrm{No answer available}",
        latex,
        stringVersion: stringVersion,
      };
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
  },
  {
    title: "(II) Simplify Rational Expressions",
    instructions: "Simplify the rational expression",
    descrption: "Divide two rational expressions",
    example: "\\frac{x^3-2x^2-15x}{3x^2-15x}",
    tags: ["Rational Expressions", "Algebra II"],
    numFields: 1,
    prompts: ["="],
    buttons: [],
    generate: () => {
      const symbol = "x";

      let n = nerdamer(symbol).add(randomIntInRange(-5, 5, [0, 1, -1]));
      let d = randomIntInRange(-5, 5, [0, -1, 1]);

      const solution = `\\frac{${n.toTeX()}}{${nerdamer(d).toTeX()}}`;

      d = nerdamer(symbol).multiply(d);
      let v0 = randomIntInRange(-5, 5, [0, -1, 1]);
      n = n.multiply(symbol).multiply(nerdamer(symbol).add(v0));
      d = d.multiply(nerdamer(symbol).add(v0));

      // const nL = n.expand().toTeX().replaceAll("\\cdot", " ");
      const nL = replaceAll(n.expand().toTeX(), "\\cdot", " ");
      const dL = replaceAll(d.expand().toTeX(), "\\cdot", " ");
      // const dL = d.expand().toTeX().replaceAll("\\cdot", " ");

      const latex = `\\frac{${nL}}{${dL}}`;

      const stringVersion = nerdamer.convertFromLaTeX(latex).toString();

      return { solution, latex, stringVersion: stringVersion };
    },

    verify: (question, userResponse, questionString) => {
      let ok = true;
      // console.log(questionString);
      const q = nerdamer(questionString);

      const r = nerdamer.convertFromLaTeX(userResponse);

      for (let i = -10; i < 10; i++) {
        try {
          const qE = q.evaluate({ x: i }).toString();
          const rE = r.evaluate({ x: i }).toString();
          if (qE !== rE) {
            ok = false;
          }
        } catch (e) {}
      }

      return ok;
    },
  },
  {
    title: "Absolute Value Equations",
    instructions: "Solve for x",
    descrption: "Simplify rational expressions",
    example: "|x+5|=7",
    numFields: 2,
    prompts: ["x_1=", "x_2="],
    tags: ["Absolute Value", "Algebra II"],
    buttons: [],
    generate: () => {
      const symbol = "x";

      const o = randomIntInRange(0, 20);

      const lhsN = randomIntInRange(-10, 10);

      const lhs = nerdamer.abs(nerdamer(symbol).add(lhsN));

      const solution = `${o + -lhsN}, ${-o + -lhsN}`;

      const rhs = nerdamer(o);

      const latex = `${lhs.toTeX()}=${rhs.toTeX()}`;
      // console.log(latex);

      const stringVersion = nerdamer(
        `${lhs.toString()}=${rhs.toString()}`
      ).toString();
      // console.log(nerdamer.abs("x+4").toTeX());
      return { solution, latex, stringVersion };
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
  },

  {
    title: "2nd Root Radicals",
    instructions: "Simplify the radical",
    description: "Simplify square root radical expressions",
    example: "\\sqrt{75}",
    numFields: 1,
    prompts: ["="],
    tags: ["Radicals", "Algebra I"],
    buttons: [{ cmd: "\\sqrt{}", ui: "\\sqrt{}" }],

    generate: () => {
      const outside = randomIntInRange(2, 4, [0, 1, -1]);

      const inside = randomIntInRange(2, 10, [0, 1, -1]);
      const solution = `${outside}\\sqrt{${inside}}`;

      const newInside = inside * Math.pow(outside, 2);

      const latex = `\\sqrt{${newInside}}`;

      return { solution, latex, stringVersion: "" };
    },

    verify: (question, userResponses, questionString) => {
      const response = userResponses[0];

      const qN = nerdamer.convertFromLaTeX(question);

      const value = nerdamer("1 + x").evaluate({ x: qN });
      const uValue = nerdamer("1 + x").evaluate({
        x: nerdamer.convertFromLaTeX(response),
      });

      return value.toString() === uValue.toString();
    },
  },
  {
    title: "3rd Root Radicals",
    instructions: "Simplify the radical",
    description: "Simplify 3rd root radical expressions",
    example: "\\sqrt[3]{128}",
    numFields: 1,
    prompts: ["="],
    tags: ["Radicals", "Algebra I"],
    buttons: [{ cmd: "\\nthroot3{}", ui: "\\sqrt[3]{}" }],

    generate: () => {
      const outside = randomIntInRange(2, 4, [0, 1, -1]);
      const index = 3;

      const inside = randomIntInRange(2, 10, [0, 1, -1]);

      const solution = `${outside}\\sqrt[3]{${inside}}`;

      const newInside = inside * Math.pow(outside, index);

      const latex = `\\sqrt[${index}]{${newInside}}`;

      return { solution, latex, stringVersion: "" };
    },

    verify: (question, userResponses, questionString) => {
      const response = nerdamer.convertFromLaTeX(userResponses[0]);

      const qN = nerdamer.convertFromLaTeX(question);
      const value = nerdamer("1 + x").evaluate({ x: qN });
      const uValue = nerdamer("1 + x").evaluate({
        x: response,
      });

      return value.toString() === uValue.toString();
    },
  },
  {
    title: "4th Root Radicals",
    instructions: "Simplify the radical",
    description: "Simplify 4th root radical expressions",
    example: "\\sqrt[4]{80}",
    numFields: 1,
    prompts: ["="],
    tags: ["Radicals", "Algebra I"],
    buttons: [{ cmd: "\\nthroot4{}", ui: "\\sqrt[4]{}" }],

    generate: () => {
      const outside = randomIntInRange(2, 4, [0, 1, -1]);
      const index = 4;

      const inside = randomIntInRange(2, 4, [0, 1, -1]);

      const solution = `${outside}\\sqrt[4]{${inside}}`;
      const newInside = inside * Math.pow(outside, index);

      const latex = `\\sqrt[${index}]{${newInside}}`;

      return { solution, latex, stringVersion: "" };
    },

    verify: (question, userResponses, questionString) => {
      const response = userResponses[0];

      const qN = nerdamer.convertFromLaTeX(question);

      const value = nerdamer("1 + x").evaluate({ x: qN });
      const uValue = nerdamer("1 + x").evaluate({
        x: nerdamer.convertFromLaTeX(response),
      });

      return value.toString() === uValue.toString();
    },
  },
  {
    title: "Rationalize 2nd-root denominators",
    instructions: "Simplify the radical",
    description: "Rationalize denominators containing 2nd-root radicals ",
    example: "\\frac{4}{\\sqrt{32}}",
    numFields: 1,
    prompts: ["="],
    tags: ["Radicals", "Algebra II"],
    buttons: [{ cmd: "\\sqrt{}", ui: "\\sqrt{}" }],

    generate: () => {
      const numerator = randomIntInRange(2, 12);

      const denominatorRadicand = randomIntInRange(2, 15, [4, 9]);

      const latex = `\\frac{${numerator}}{\\sqrt{${denominatorRadicand}}}`;

      return {
        solution: "\\textrm{No Solution Available}",
        latex,
        stringVersion: "",
      };
    },

    verify: (question, userResponses, questionString) => {
      const response = userResponses[0];
      console.log(question, userResponses);
      const qN = nerdamer.convertFromLaTeX(question);

      const value = nerdamer("1 + x").evaluate({ x: qN });
      const uValue = nerdamer("1 + x").evaluate({
        x: nerdamer.convertFromLaTeX(response),
      });
      console.log(value.toString(), uValue.toString());
      return value.toString() === uValue.toString();
    },
  },
  {
    title: "Rationalize 3rd-root denominators",
    instructions: "Simplify the radical",
    description: "Rationalize denominators containing 3rd-root radicals ",
    example: "\\frac{10}{\\sqrt[3]{2}}",
    numFields: 1,
    prompts: ["="],
    tags: ["Radicals", "Algebra II"],
    buttons: [{ cmd: "\\nthroot3{}", ui: "\\sqrt[3]{}" }],

    generate: () => {
      const numerator = randomIntInRange(2, 12);

      const denominatorRadicand = randomIntInRange(2, 9);

      const latex = `\\frac{${numerator}}{\\sqrt[3]{${denominatorRadicand}}}`;

      return {
        solution: "\\textrm{No Solution Available}",
        latex,
        stringVersion: "",
      };
    },

    verify: (question, userResponses, questionString) => {
      const response = userResponses[0];

      const qN = nerdamer.convertFromLaTeX(question);

      const value = nerdamer("1 + x").evaluate({ x: qN });
      const uValue = nerdamer("1 + x").evaluate({
        x: nerdamer.convertFromLaTeX(response),
      });

      return value.toString() === uValue.toString();
    },
  },
  {
    title: "Variables in Radicals",
    instructions: "Simplify the radical",
    description: "Simplify radicals containing variables.",
    example: "\\sqrt{x^5}",
    numFields: 1,
    prompts: ["="],
    tags: ["Radicals", "Algebra I"],
    buttons: [
      { cmd: "\\sqrt{}", ui: "\\sqrt{\\ }" },
      { cmd: "\\nthroot3{}", ui: "\\sqrt[3]{\\ }" },
      { cmd: "\\nthroot4{}", ui: "\\sqrt[4]{\\ }" },
      { cmd: "\\nthroot5{}", ui: "\\sqrt[5]{\\ }" },
    ],

    generate: () => {
      const index = randomIntInRange(2, 5);
      const power = randomIntInRange(2, 7);

      const innerPower = randomIntInRange(1, index - 1);
      console.log(innerPower, index, power);

      const latex = `\\sqrt[${index}]{x^{${innerPower + index * power}}}`;

      return {
        solution: "\\textrm{No Solution Available}",
        latex,
        stringVersion: "",
      };
    },

    verify: (question, userResponses, questionString) => {
      const response = userResponses[0];

      let ok = true;
      const res = nerdamer.convertFromLaTeX(response);
      const q = nerdamer.convertFromLaTeX(question);
      for (let i = 1; i < 3; i++) {
        const a = res.evaluate({ x: i });
        const b = q.evaluate({ x: i });
        console.log(a, b);
        if (a.toString() !== b.toString()) ok = false;
      }
      return ok;
    },
  },
];
