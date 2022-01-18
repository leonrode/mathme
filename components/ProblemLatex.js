import Latex from "react-latex-next";

function ProblemLatex({ latex }) {
  return (
    <div className="scale-150">
      <Latex>{`$${latex}$`}</Latex>
    </div>
  );
}

export default ProblemLatex;
