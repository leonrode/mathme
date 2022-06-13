import nerdamer from "nerdamer/all";
import { randomIntInRange, gcd, replaceAll, randomFactor, randomOp, performOp } from "../utils";

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
      const solution = randomIntInRange(-10, 10, [0]);
      const symbol = "x";
      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);

      let value = randomIntInRange(-20, 20, [0]);

      const op = randomOp();

      lhs = performOp(op, lhs, value);
      rhs = performOp(op, rhs, value);
      console.log(lhs.toString(), rhs.toString())
      // lhs = lhs.add(value);
      // rhs = rhs.add(value);

      const latex = replaceAll(lhs.toTeX() + "=" + rhs.toTeX(), "\\cdot", "");

      return { solution, latex };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },

]