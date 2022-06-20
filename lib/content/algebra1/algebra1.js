import nerdamer from "nerdamer/all";
import {
  randomIntInRange,
  gcd,
  replaceAll,
  randomFactor,
  randomOp,
  randomSquare,
  randomMultOrDiv,
  randomAddOrSub,
  performOp,
  randomFactorOfNumber,
  randomCompositeNumber,
  oppositeOp,
  randomize,
} from "../utils";

export default [
  {
    id: 0,
    instructions: "Solve for x",
    title: "Solve one step linear equations",
    description: "Solve very basic linear equations.",
    example: "x+17=34",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,
    prompts: ["x ="],
    buttons: [],

    generate: () => {
      const solution = randomIntInRange(-20, 20, [0]);
      const symbol = "x";
      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);

      const op = randomOp();

      if (op === "DIV") {
        const factor = randomFactorOfNumber(solution);

        if (factor) {
          lhs = performOp(op, nerdamer(symbol), factor);
          rhs = performOp(op, nerdamer(solution), factor);
        } else {
          const v = randomIntInRange(-8, 8, [0, 1]);
          // prime
          lhs = performOp("MULT", nerdamer(symbol), v);
          rhs = performOp("MULT", nerdamer(solution), v);
        }
      } else {
        const value = randomIntInRange(-10, 10, [0, 1, -1]);

        lhs = performOp(op, lhs, value);
        rhs = performOp(op, rhs, value);
      }
      ({ lhs, rhs } = randomize(lhs, rhs));
      const latex = replaceAll(lhs.toTeX() + "=" + rhs.toTeX(), "\\cdot", "");

      return { solution, latex };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  {
    id: 1,
    instructions: "Solve for x",
    title: "Solve two-step linear equations",
    description: "Solve very basic linear equations.",
    example: "6 = \\frac{x}{4} + 2",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,
    prompts: ["x ="],
    buttons: [],

    generate: () => {
      const solution = randomCompositeNumber(-25, 25, [0, 1, -1]);
      const symbol = "x";
      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);

      const value = randomFactorOfNumber(solution);
      const op1 = randomMultOrDiv();

      lhs = performOp(op1, lhs, value);
      rhs = performOp(op1, rhs, value);

      const op2 = randomAddOrSub();
      const v2 = randomIntInRange(-20, 20, [0]);
      lhs = performOp(op2, lhs, v2);
      rhs = performOp(op2, rhs, v2);
      ({ lhs, rhs } = randomize(lhs, rhs));
      const latex = replaceAll(lhs.toTeX() + "=" + rhs.toTeX(), "\\cdot", "");

      return { solution, latex };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
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
    tags: ["Equations"],
    numFields: 1,
    prompts: ["x ="],
    buttons: [],

    generate: () => {
      const solution = randomIntInRange(-25, 25, [0]);
      const symbol = "x";

      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);

      const v1 = randomIntInRange(-15, 15, [0]);

      const op = "ADD";
      lhs = performOp(op, lhs, v1);
      rhs = performOp(op, rhs, v1);

      const v2 = randomIntInRange(-5, 5, [0, 1]);
      lhs = performOp("MULT", lhs, v2);
      rhs = performOp("MULT", rhs, v2);

      const v3 = randomIntInRange(-8, 8, [0]);
      lhs = performOp("ADD", lhs, nerdamer(symbol).multiply(v3));
      rhs = performOp("ADD", rhs, nerdamer(symbol).multiply(v3));
      ({ lhs, rhs } = randomize(lhs, rhs));
      let latex = lhs.toTeX() + "=" + rhs.toTeX();
      latex = replaceAll(latex, "\\cdot", "");
      return { solution, latex, stringVersion: lhs.toString() };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  // {
  //   id: 3,
  //   title: "Absolute Value Equations",
  //   instructions: "Solve for x",
  //   description: "Solve multi-step linear equations",
  //   example: "2x+10=50",
  //   category: "Algebra I",
  //   tags: ["Equations"],
  //   numFields: 1,
  //   prompts: ["x ="],
  //   buttons: [],

  //   generate: () => {
  //     const rhsval = randomIntInRange(0, 25);
  //     const symbol = "x";

  //     let lhs = nerdamer(symbol);
  //     let rhs = nerdamer(rhsval);

  //     const v1 = randomIntInRange(-10, 10, [0, 1]);

  //     const op = randomOp();

  //     lhs = performOp(op, lhs, v1);

  //     lhs = nerdamer(`abs(${lhs.toString()})`);
  //     console.log(lhs.toString());
  //     let latex = `${lhs.toTeX()}` + "=" + rhs.toTeX();
  //     latex = replaceAll(latex, "\\cdot", "");
  //     return { rhsval, latex, stringVersion: lhs.toString() };
  //   },
  //   verify: (question, userResponse, _, providedSolution) => {
  //     console.log(nerdamer.solve(nerdamer.convertFromLaTeX(question)));
  //     return nerdamer
  //       .convertFromLaTeX(userResponse)
  //       .eq(nerdamer.convertFromLaTeX(providedSolution));
  //   },
  // },

  {
    id: 4,
    title: "Easy radical equations",
    instructions: "Solve for x",
    description: "Solve multi-step linear equations",
    example: "\\sqrt{x-4} = 3",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,
    prompts: ["x ="],
    buttons: [],

    generate: () => {
      const square = randomSquare();
      const symbol = "x";

      const op = randomOp();
      console.log(op);
      let value;
      if (op === "DIV") {
        value = randomFactorOfNumber(square);
      } else if (op === "SUB") {
        value = randomIntInRange(square + 1, square + 10);
      } else {
        value = randomIntInRange(5, 25);
      }

      let lhs = nerdamer(symbol);
      let rhs = nerdamer(square);

      // rhs = performOp(op, rhs, value);
      lhs = performOp(oppositeOp(op), lhs, value);
      console.log(square, op, value, lhs.toString());
      const solution = parseInt(
        performOp(op, nerdamer(square), value).toString()
      );
      lhs = nerdamer.sqrt(lhs);
      rhs = nerdamer.sqrt(rhs);

      ({ lhs, rhs } = randomize(lhs, rhs));

      let latex = lhs.toTeX() + "=" + rhs.toTeX();
      latex = replaceAll(latex, "\\cdot", "");
      return { solution, latex, stringVersion: lhs.toString() };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
];
