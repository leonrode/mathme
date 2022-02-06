import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const EditableMathField = dynamic(() => import("react-mathquill"), {
  ssr: false,
});

import Latex from "react-latex-next";
function ProblemInput({
  prompt,
  index,
  setter,
  incorrect,
  correct,
  checkHandler,
  latex,
  isActive,
  setActive,
  setInactive,
}) {
  // const [_latex, setLatex] = useState(latex);
  const [field, setField] = useState(null);

  useEffect(() => {
    if (field) {
      setter((fields) => [
        ...fields.slice(0, index),
        field,
        ...fields.slice(index),
      ]);
    }
  }, [field]);
  return (
    <div className=" dark:text-text flex items-center ">
      <div className="text-text dark:text-darkText">
        <Latex>{`$${prompt}$`}</Latex>
      </div>
      <div
        className={`${
          incorrect ? "animate-wrongFade" : correct ? "animate-rightFade" : ""
        } ml-4 border-[3px] border-transparent rounded-lg`}
        onKeyDown={async (e) =>
          e.key === "Enter" ? await checkHandler() : null
        }
      >
        <EditableMathField
          latex={latex}
          id="math-input"
          mathquillDidMount={(field) => setField(field)}
        ></EditableMathField>
      </div>
    </div>
  );
}

export default ProblemInput;
