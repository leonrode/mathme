import nerdamer from "nerdamer/all";
import algebra from "algebra.js";
import Algebrite from "algebrite";
import { randomIntInRange, gcd, replaceAll, randomFactor } from "./utils";

import algebra1 from "./algebra1/algebra1";

export default [
  ...algebra1,

  {
    id: 1,
    title: "Solve two step linear equations",
    instructions: "Solve for x",
    description: "Solve more complex linear equations",
    example: "2(x+5)=10",
    category: "Algebra I",
    subcategory: "Linear Equations",
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

    verify: (question, userResponses, questionString, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponses)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  {
    id: 2,
    title: "Solve multi-step linear equations",
    instructions: "Solve for x",
    description: "Solve multi-step linear equations",
    example: "2x+10=50",
    category: "Algebra I",
    subcategory: "Linear Equations",
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
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  {
    id: 3,
    title: "Factor quadratics where a = 1",
    instructions: "Factor the quadratic",
    descrption: "Factor basic quadratics into binomials",
    example: "x^2 + 5x + 6",
    category: "Algebra I",
    subcategory: "Quadratics",
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

    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(providedSolution)
        .eq(nerdamer.convertFromLaTeX(userResponse));
    },
  },
  {
    id: 4,
    title: "Factor quadratics where a ≠ 1",
    instructions: "Factor the quadratic",
    description: "Factor a quadratic where a ≠ 1",
    example: "2x^2+10x+12",
    category: "Algebra I",
    subcategory: "Quadratics",
    numFields: 1,
    prompts: ["="],
    buttons: [],
    generate: () => {
      const symbol = "x";

      let firstFactor = nerdamer(`${randomIntInRange(-5, 5, [0, 1])}x`);

      firstFactor = firstFactor.add(randomIntInRange(-10, 10, [0]));

      let secondFactor = nerdamer(symbol).add(randomIntInRange(-10, 10, [0]));

      let poly = firstFactor.multiply(secondFactor).expand();

      let latex = poly.toTeX();
      latex = replaceAll(latex, "\\cdot", "");
      const solution = `(${replaceAll(
        firstFactor.toTeX(),
        "\\cdot",
        ""
      )})(${secondFactor.toTeX()})`;
      return { solution, latex, stringVersion: poly.toString() };
    },

    verify: (question, userResponse, questionString, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse[0])
        .expand()
        .eq(nerdamer.convertFromLaTeX(providedSolution).expand());
    },
  },
  {
    id: 5,
    title: "Simplify Rational Expressions",
    instructions: "Simplify the rational expression",
    descrption: "Simplify more complex rational expresions",
    example: "\\frac{x^3-7x^2+12x}{2x^2-8x}",
    category: "Algebra II",
    subcategory: "Rational Expressions",
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

    verify: (question, userResponses, questionString, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(providedSolution)
        .eq(nerdamer.convertFromLaTeX(userResponses[0]));
    },
  },
  {
    id: 6,
    title: "Multiply Rational Expressions",
    instructions: "Simplify the rational expression",
    descrption: "Multiply two rational expressions",
    example: "\\frac{4x+8}{4x^2-25}\\cdot\\frac{6x+15}{2x^2+4x}",
    category: "Algebra II",
    subcategory: "Rational Expressions",
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
    id: 7,
    title: "Absolute Value Equations",
    instructions: "Solve for x",
    descrption: "Solve absolute value equations",
    example: "|x+5|=7",
    numFields: 2,
    prompts: ["x_1=", "x_2="],
    category: "Algebra II",
    subcategory: "Absolute Value",
    buttons: [],
    generate: () => {
      const symbol = "x";

      const o = randomIntInRange(0, 20, [0]);

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

    verify: (question, userResponses, questionString, providedSolution) => {
      // console.log(userResponses, providedSolution, typeof providedSolution)
      const evalled = eval("[" + providedSolution + "]");

      userResponses = userResponses.map(Number);

      return evalled.sort().join(",") === userResponses.sort().join(",");
    },
  },
  {
    id: 8,
    title: "2nd Root Radicals",
    instructions: "Simplify the radical",
    description: "Simplify square root radical expressions",
    example: "\\sqrt{75}",
    numFields: 1,
    prompts: ["="],
    category: "Algebra I",
    subcategory: "Radicals",
    buttons: [{ cmd: "\\sqrt{}", ui: "\\sqrt{}" }],

    generate: () => {
      const outside = randomIntInRange(2, 4, [0, 1, -1]);

      const inside = randomIntInRange(2, 10, [0, 1, -1]);
      const solution = `${outside}\\sqrt{${inside}}`;

      const newInside = inside * Math.pow(outside, 2);

      const latex = `\\sqrt{${newInside}}`;

      return { solution, latex, stringVersion: "" };
    },

    verify: (question, userResponses, questionString, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponses[0])
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  {
    id: 9,
    title: "3rd Root Radicals",
    instructions: "Simplify the radical",
    description: "Simplify 3rd root radical expressions",
    example: "\\sqrt[3]{128}",
    numFields: 1,
    prompts: ["="],
    category: "Algebra I",
    subcategory: "Radicals",
    buttons: [{ cmd: "\\nthroot3{}", ui: "\\sqrt[3]{}" }],

    generate: () => {
      const outside = randomIntInRange(2, 4, [0, 1, -1]);
      const index = 3;

      const inside = randomIntInRange(2, 11, [0, 1, -1]);

      const solution = `${outside}\\sqrt[3]{${inside}}`;

      const newInside = inside * Math.pow(outside, index);

      const latex = `\\sqrt[${index}]{${newInside}}`;

      return { solution, latex, stringVersion: "" };
    },

    verify: (question, userResponses, questionString, providedSolution) => {
      // console.log(nerdamer.convertFromLaTeX(providedSolution).eq(nerdamer.convertFromLaTeX(userResponses[0])))
      return nerdamer
        .convertFromLaTeX(providedSolution)
        .eq(nerdamer.convertFromLaTeX(userResponses[0]));
    },
  },

  {
    id: 10,
    title: "Rationalize 2nd-root denominators",
    instructions: "Simplify the radical",
    description: "Rationalize denominators containing 2nd-root radicals ",
    example: "\\frac{4}{\\sqrt{32}}",
    numFields: 1,
    prompts: ["="],
    category: "Algebra I",
    subcategory: "Radicals",
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
    id: 11,
    title: "Rationalize 3rd-root denominators",
    instructions: "Simplify the radical",
    description: "Rationalize denominators containing 3rd-root radicals ",
    example: "\\frac{10}{\\sqrt[3]{2}}",
    numFields: 1,
    prompts: ["="],
    category: "Algebra II",
    subcategory: "Radicals",
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
    id: 12,
    title: "Variables in Radicals",
    instructions: "Simplify the radical",
    description: "Simplify radicals containing variables.",
    example: "\\sqrt{x^5}",
    numFields: 1,
    prompts: ["="],
    category: "Algebra I",
    subcategory: "Radicals",
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

        if (a.toString() !== b.toString()) ok = false;
      }
      return ok;
    },
  },
  {
    id: 13,
    title: "Simplifying Square Roots",
    instructions: "Simplify",
    description: "Simplify operations with square roots.",
    example: "2\\sqrt{12}+9\\sqrt{3}",
    numFields: 1,
    prompts: ["="],
    category: "Algebra I",
    subcategory: "Radicals",
    buttons: [{ cmd: "\\sqrt{}", ui: "\\sqrt{\\ }" }],

    generate: () => {
      const inner = randomIntInRange(2, 7);

      const outer1 = randomIntInRange(3, 9);
      const outer2 = randomIntInRange(3, 7);

      const inner2 = inner * Math.pow(outer2, 2);

      const outer3 = randomIntInRange(3, 7);

      const isSubtraction = Math.floor(Math.random() * 2) === 1;

      const latex = `${outer3}\\sqrt{${inner2}}${
        isSubtraction ? "-" : "+"
      }${outer1}\\sqrt{${inner}}`;

      const solution = `${outer2 * outer3 + outer1}\\sqrt{${inner}}`;

      return {
        solution: solution,
        latex,
        stringVersion: "",
      };
    },

    verify: (question, userResponses, questionString, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(providedSolution)
        .eq(nerdamer.convertFromLaTeX(userResponses[0]));
    },
  },
  {
    id: 14,
    title: "Solve linear equations with x on both sides",
    instructions: "Solve for x",
    description:
      "Solve linear equations where x is on both sides of the equation.",
    example: "9x=10x+8",
    numFields: 1,
    prompts: ["="],
    category: "Algebra I",
    subcategory: "Linear Equations",
    buttons: [],

    generate: () => {
      const value = randomIntInRange(-10, 10, [0]);

      let lhs = nerdamer("x");
      let rhs = nerdamer(value);

      const b = randomIntInRange(-10, 10, [0, 1, -1]);

      lhs = lhs.multiply(b);
      rhs = rhs.multiply(b);
      const subtract = Math.floor(Math.random() * 2) === 1;

      const a = randomIntInRange(-10, 10, [1, 0, -1]);
      if (subtract) {
        lhs = lhs.subtract(`${a}x`);
        rhs = rhs.subtract(`${a}x`);
      } else {
        lhs = lhs.add(`${a}x`);
        rhs = rhs.add(`${a}x`);
      }

      const latex = replaceAll(`${lhs.toTeX()}=${rhs.toTeX()}`, "\\cdot", "");

      const solution = `${value}`;

      return {
        solution: solution,
        latex,
        stringVersion: "",
      };
    },

    verify: (question, userResponses, questionString, providedSolution) => {
      return nerdamer(providedSolution).eq(userResponses[0]);
    },
  },
  {
    id: 15,
    title: "Find the remainder of polynomial division",
    instructions: "Find the remainder after dividing",
    description:
      "Find the remainder of a polynomial being divided by a binomial.",
    example: "\\frac{x^3-7x-6}{x-4} \\Rightarrow 30",
    numFields: 1,
    prompts: ["="],
    category: "Algebra II",
    subcategory: "Polynomials",
    buttons: [],

    generate: () => {
      const remainder = randomIntInRange(5, 30);

      const b = randomIntInRange(-7, 7, [0, 1, -1]);
      const c = randomIntInRange(-10, 10, [0, 1, -1]);

      const v = randomIntInRange(-5, 5, [0, 1, -1]);
      let polynomial = nerdamer.convertFromLaTeX(
        `x^2${b > 0 ? "+" : ""}${b}x${c > 0 ? "+" : ""}${c}`
      );

      let binomial = nerdamer.convertFromLaTeX(`x${v > 0 ? "+" : ""}${v}`);

      polynomial = polynomial.multiply(binomial).expand();

      polynomial = polynomial.add(nerdamer(remainder));

      const latex = `\\frac{${polynomial.toTeX()}}{${binomial.toTeX()}}`;
      const solution = `${remainder}`;

      return {
        solution: solution,
        latex: replaceAll(latex, "\\cdot", ""),
        stringVersion: "",
      };
    },

    verify: (question, userResponses, questionString, providedSolution) => {
      // console.log(nerdamer(providedSolution).eq(nerdamer(userResponses[0])))
      return nerdamer(providedSolution).eq(nerdamer(userResponses[0]));
    },
  },
  {
    id: 16,
    title: "Determine minimum/maximum of parabola",
    instructions: "Determine the minimum or maximum of the function",
    description: "Determine the minimum/maximum point of a polynomial function",
    example: "-x^2+10x-8 \\Rightarrow (5, 17)",
    numFields: 1,
    prompts: ["(x, y) = "],
    category: "Algebra II",
    subcategory: "Polynomials",
    buttons: [],

    generate: () => {
      const x = randomIntInRange(-10, 10);
      const y = randomIntInRange(-15, 15);
      console.log(x, y);
      // construct vertex form
      const latex = `(x${x > 0 ? `-${x}` : `+${Math.abs(x)}`})^2${
        y > 0 ? `+${y}` : y
      }`;
      let n = nerdamer.convertFromLaTeX(latex);

      n = n.expand();

      return {
        solution: [x, y],
        latex: replaceAll(n.toTeX(), "\\cdot", ""),
        stringVersion: "",
      };
    },

    verify: (question, userResponses, questionString, providedSolution) => {
      console.log(userResponses, providedSolution, question, questionString);

      console.log(
        questionString.substring(
          questionString.indexOf("}") + 1,
          questionString.substring(1).indexOf("x")
        )
      );
      // console.log(nerdamer(providedSolution).eq(nerdamer(userResponses[0])))
      return nerdamer(providedSolution).eq(nerdamer(userResponses[0]));
    },
  },
];
