import { useState } from "react";
import dynamic from "next/dynamic";

const EditableMathField = dynamic(() => import("react-mathquill"), {
  ssr: false,
});

import Latex from "react-latex-next";
function ProblemInput({
  prompt,
  index,
  setter,
  _latexList,
  incorrect,
  correct,
}) {
  console.log(_latexList);
  const [latex, setLatex] = useState(_latexList[index]);

  return (
    <div className=" dark:text-text flex items-center ">
      <div className="text-text dark:text-darkText">
        <Latex>{`$${prompt}$`}</Latex>
      </div>
      <div
        className={`${
          incorrect ? "animate-wrongFade" : correct ? "animate-rightFade" : ""
        } ml-4 border-[3px] border-transparent rounded-lg`}
      >
        <EditableMathField
          latex={latex}
          id="math-input"
          onChange={(mathField) => {
            setter((fields) => [
              ...fields.slice(0, index),
              mathField.latex(),
              ...fields.slice(index + 1),
            ]);
            setLatex("");
          }}
        ></EditableMathField>
      </div>
    </div>
  );
}

export default ProblemInput;
