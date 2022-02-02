import Latex from "react-latex-next";

function ProblemButton({ index, toClick, content }) {
  return (
    <div
      key={index}
      onClick={toClick}
      className={`${
        index !== 0 ? "ml-2" : ""
      } w-10 h-10 bg-primary dark:bg-darkPrimary rounded-lg flex items-center justify-center`}
    >
      <Latex>{`$${content}$`}</Latex>
    </div>
  );
}

export default ProblemButton;
