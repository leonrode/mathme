import Latex from "react-latex-next";

function QuestionLatex({ latex }) {
  return (
    <div className="scale-150">
      <Latex>{`$${latex}$`}</Latex>
    </div>
  );
}

export default QuestionLatex;
