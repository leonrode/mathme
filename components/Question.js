import Timer from "./Timer";
import TopicStatus from "./TopicStatus";

import QuestionLatex from "./QuestionLatex";

import QuestionInput from "./QuestionInput";

import CheckAnswerButton from "./CheckAnswerButton";

import QuestionButton from "./QuestionButton";

import { MdHelpOutline } from "react-icons/md";

import Latex from "react-latex-next";

import { useState } from "react";
import { verifyAnswer } from "../_api/api";

function Question({
  topicId,
  noQuestions,
  question,
  onCorrect,
  onIncorrect,
  noCorrect,
  noIncorrect,
}) {
  const [latexFields, setLatexFields] = useState([]);

  const [isVerifyingResponse, setIsVerifyingResponse] = useState(false);
  const [questionStatus, setQuestionStatus] = useState("");
  const verifyResponse = async () => {
    if (isVerifyingResponse) return;
    if (!latexFields.every((field) => field.latex() !== "")) return;
    const isCorrect = await verifyAnswer(
      topicId,
      question.latex,
      question.stringVersion,
      latexFields.map((field) => field.latex())
    );

    if (isCorrect) {
      await onCorrect(question, latexFields);
      setQuestionStatus("correct");
    } else {
      await onIncorrect(question, latexFields);
      setQuestionStatus("incorrect");
    }

    setTimeout(() => setQuestionStatus(""), 500);

    latexFields.forEach((field) => field.latex(""));
  };

  return (
    <>
      <div className="flex items-start justify-between w-full lg:w-1/2">
        <div className="flex items-center">
          <h3 className="text-text dark:text-darkText font-bold text-xl">
            {question.instructions}
          </h3>
          <h3
            className="text-primary dark:text-darkPrimary text-lg ml-4 cursor-pointer select-none"
            onClick={async () => await onIncorrect(question, ["SKIP"])}
          >
            skip
          </h3>
        </div>

        <div className="flex flex-col items-end">
          <Timer />

          <TopicStatus
            remaining={
              noQuestions ? noQuestions - noCorrect - noIncorrect : null
            }
            noCorrect={noCorrect}
            noIncorrect={noIncorrect}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center my-16 scale-150">
        <Latex>{`$${question.latex}$`}</Latex>
      </div>

      <div className="flex items-center justify-between w-full lg:w-1/2">
        <div className="flex items-center">
          {question.numFields > 0 && (
            <div className="flex flex-col ">
              {question.prompts.map((prompt, i) => {
                return (
                  <QuestionInput
                    prompt={prompt}
                    index={i}
                    key={i}
                    incorrect={questionStatus === "incorrect"}
                    correct={questionStatus === "correct"}
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
            incorrect={questionStatus === "incorrect"}
            correct={questionStatus === "correct"}
            isChecking={false}
            verifyHandler={async () => await verifyResponse()}
          />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {question.buttons.map((button, index) => (
          <QuestionButton
            key={index}
            index={index}
            content={button.ui}
            toClick={() => latexFields[0].write(button.cmd)}
          />
        ))}
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

export default Question;
