import Latex from "react-latex-next";
import { MdKeyboardArrowDown, MdCheck, MdClear } from "react-icons/md";
import { useState } from "react";
function SummaryQuestion({
  index,
  isLast,
  questionLatex,
  solution,
  isCorrect,
  userResponses,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="flex flex-col">
      <div
        className={`w-full p-4 flex justify-between items-center border-l-2 ${
          isCorrect
            ? "border-l-success dark:border-l-success"
            : "border-l-error dark:border-l-darkError"
        } rounded ${!isLast ? "mb-4" : ""}`}
      >
        <div className="flex items-center">
          <h3>{index + 1}</h3>
          {isCorrect ? (
            <MdCheck className={`ml-2 text-success`} />
          ) : (
            <MdClear className="ml-2 text-error dark:text-darkError" />
          )}
        </div>
        <div className="text-2xl">
          <Latex>{`$${questionLatex}$`}</Latex>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <h3 className="text-primary dark:text-darkPrimary select-none">
            {showDropdown ? "Hide" : "Reveal"} Answer
          </h3>
          <MdKeyboardArrowDown
            size={30}
            className={`text-primary dark:text-darkPrimary`}
          />
        </div>
      </div>
      <div
        className={`${
          showDropdown ? "h-14" : "h-0 "
        } origin-top mb-4 overflow-hidden transition-all`}
      >
        <div className="flex items-center">
          <h3 className="font-bold ">Answer:</h3>
          <div className="ml-2 ">
            <Latex>{`$${solution}$`}</Latex>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <h3
            className={`${
              isCorrect
                ? "text-success dark:text-darkSuccess"
                : "text-error dark:text-darkError"
            }`}
          >
            Your response:{" "}
          </h3>
          <div
            className={`ml-2 ${
              isCorrect
                ? "text-success dark:text-darkSuccess"
                : "text-error dark:text-darkError"
            }`}
          >
            <Latex>{`$${
              userResponses[0] === "Skipped"
                ? "\\textrm{Skipped}"
                : userResponses[0]
            }$`}</Latex>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryQuestion;
