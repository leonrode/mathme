import { useState } from "react";
import dynamic from "next/dynamic";

const EditableMathField = dynamic(() => import("react-mathquill"), {
  ssr: false,
});

import Latex from "react-latex-next";
function ProblemInput({ prompt, index, setter, _latex }) {
  const [latex, setLatex] = useState(_latex);

  return (
    <div className="mt-4 flex items-center">
      <Latex>{`$${prompt}$`}</Latex>
      <EditableMathField
        latex={latex}
        id="math-input"
        onChange={(mathField) => {
          setter((fields) => [
            ...fields.slice(0, index),
            mathField.latex(),
            ...fields.slice(index + 1),
          ]);
          setLatex(mathField.latex());
        }}
      ></EditableMathField>
    </div>
  );
}

export default ProblemInput;
