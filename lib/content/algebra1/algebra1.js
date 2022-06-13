import nerdamer from "nerdamer/all";
import {
  randomIntInRange,
  gcd,
  replaceAll,
  randomFactor,
  randomOp,
  performOp,
  randomFactorOfNumber,
} from "../utils";

export default [
  {
    id: 0,
    instructions: "Solve for x",
    title: "Solve one step linear equations",
    description: "Solve very basic linear equations.",
    example: "x+17=34",
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

      const latex = replaceAll(lhs.toTeX() + "=" + rhs.toTeX(), "\\cdot", "");

      return { solution, latex };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
];
