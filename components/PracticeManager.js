import Problem from "./Problem";

import { useState, useEffect } from "react";
import { fetchProblems, verifyAnswer } from "../_api/api";

function PracticeManager({ topicId, playlist }) {
  const [nextQuestions, setNextQuestions] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(playlist ? 0 : null);
  const [noCorrect, setNoCorrect] = useState(0);
  const [noIncorrect, setNoIncorrect] = useState(0);

  useEffect(() => {
    (async () => {
      let questions;
      if (playlist) {
        questions = await fetchProblems(
          playlist.topics[topicIndex].topic.id,
          playlist.topics[topicIndex].noQuestions
        );
      } else {
        questions = await fetchProblems(topicId, 10);
      }

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

  const onQuestionAnswer = async (isCorrect, problem, latexFields) => {
    setCompletedQuestions((prev) => [
      ...prev,
      {
        isCorrect: isCorrect,
        latex: problem.latex,
        userResponses: latexFields.map((field) => {
          return field.latex();
        }),
        solution: problem.solution,
      },
    ]);
    isCorrect
      ? setNoCorrect((prev) => prev + 1)
      : setNoIncorrect((prev) => prev + 1);

    await getNextQuestion();
  };

  return (
    nextQuestions && (
      <Problem
        topicId={topicId}
        noQuestions={playlist ? playlist.topics[topicIndex].noQuestions : null}
        noCorrect={noCorrect}
        noIncorrect={noIncorrect}
        problem={nextQuestions[index]}
        onCorrect={async (problem, latexFields) =>
          await onQuestionAnswer(true, problem, latexFields)
        }
        onIncorrect={async (problem, latexFields) =>
          await onQuestionAnswer(false, problem, latexFields)
        }
      />
    )
  );
}

export default PracticeManager;
