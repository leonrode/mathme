import Problem from "./Problem";

import { useState, useEffect } from "react";
import { fetchProblems, verifyAnswer } from "../_api/api";

function PracticeManager({ topicId, playlist }) {
  const [nextQuestions, setNextQuestions] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  const [noCorrect, setNoCorrect] = useState(0);
  const [noIncorrect, setNoIncorrect] = useState(0);

  useEffect(() => {
    (async () => {
      const questions = await fetchProblems(topicId, 10);

      setNextQuestions(questions.questions);
    })();
  }, []);

  const getNextQuestion = async () => {
    if (index === nextQuestions.length - 1) {
      const questions = await fetchProblems(topicId, 10);
      setNextQuestions(questions.questions);
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    nextQuestions && (
      <Problem
        topicId={topicId}
        noCorrect={noCorrect}
        noIncorrect={noIncorrect}
        problem={nextQuestions[index]}
        onCorrect={async (problem, latexFields) => {
          setCompletedQuestions((prev) => [
            ...prev,
            {
              isCorrect: true,
              latex: problem.latex,
              userResponses: latexFields.map((field) => {
                return field.latex();
              }),
              solution: problem.solution,
            },
          ]);
          setNoCorrect((prev) => prev + 1);

          await getNextQuestion();
        }}
        onIncorrect={async (problem, latexFields) => {
          setCompletedQuestions((prev) => [
            ...prev,
            {
              isCorrect: false,
              latex: problem.latex,
              userResponses: latexFields.map((field) => {
                return field.latex();
              }),
              solution: problem.solution,
            },
          ]);
          setNoIncorrect((prev) => prev + 1);
          await getNextQuestion();
        }}
      />
    )
  );
}

export default PracticeManager;
