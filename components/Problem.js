import Timer from "./Timer";
import TopicStatus from "./TopicStatus";

import ProblemLatex from "./ProblemLatex";

import ProblemInput from "./ProblemInput";

import CheckAnswerButton from "./CheckAnswerButton";

import { MdHelpOutline } from "react-icons/md";

import { useState } from "react";
import { verifyAnswer } from "../_api/api";

function Problem({
  topicId,
  problem,
  onCorrect,
  onIncorrect,
  noCorrect,
  noIncorrect,
}) {
  const [latexFields, setLatexFields] = useState([]);

  const [isVerifyingResponse, setIsVerifyingResponse] = useState(false);
  const [problemStatus, setProblemStatus] = useState("");
  const verifyResponse = async () => {
    if (isVerifyingResponse) return;
    if (!latexFields.every((field) => field.latex() !== "")) return;
    const isCorrect = await verifyAnswer(
      topicId,
      problem.latex,
      problem.stringVersion,
      latexFields.map((field) => field.latex())
    );

    if (isCorrect) {
      await onCorrect(problem, latexFields);
      setProblemStatus("correct");
    } else {
      await onIncorrect(problem, latexFields);
      setProblemStatus("incorrect");
    }

    setTimeout(() => setProblemStatus(""), 500);

    latexFields.forEach((field) => field.latex(""));
  };

  return (
    <>
      <div className="flex items-center justify-between w-full lg:w-1/2">
        <div className="flex items-center">
          <h3 className="text-text dark:text-darkText font-bold text-xl">
            {problem.instructions}
          </h3>
          <h3
            className="text-primary dark:text-darkPrimary text-lg ml-4 cursor-pointer select-none"
            // onClick={() => skipProblem()}
          >
            skip
          </h3>
        </div>

        <div className="flex flex-col items-end">
          <Timer />

          <TopicStatus
            remaining={null}
            noCorrect={noCorrect}
            noIncorrect={noIncorrect}
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 my-16 text-2xl lg:my-16">
        <ProblemLatex latex={problem.latex} />
      </div>

      <div className="flex items-center justify-between w-full lg:w-1/2">
        <div className="flex items-center">
          {problem.numFields > 0 && (
            <div className="flex flex-col ">
              {problem.prompts.map((prompt, i) => {
                return (
                  <ProblemInput
                    prompt={prompt}
                    index={i}
                    key={i}
                    incorrect={problemStatus === "incorrect"}
                    correct={problemStatus === "correct"}
                    latex={""}
                    // latex=""
                    setter={setLatexFields}
                    checkHandler={async () => await verifyResponse()}
                  />
                );
              })}
            </div>
          )}

          <CheckAnswerButton
            incorrect={problemStatus === "incorrect"}
            correct={problemStatus === "correct"}
            isChecking={false}
            verifyHandler={async () => await verifyResponse()}
          />
        </div>
      </div>
    </>
  );
}

const verifyResponse = async (
  topicId,
  questionLatex,
  questionString,
  responseFields
) => {
  const isCorrect = await verifyAnswer(
    topicId,
    questionLatex,
    questionString,
    responseFields.map((field) => {
      return field.latex();
    })
  );

  return isCorrect;
};

export default Problem;
