import Problem from "./Problem";

import { useState, useEffect } from "react";
import { fetchProblems, verifyAnswer } from "../_api/api";

function PracticeManager({ topicId, playlist }) {
  const [nextQuestions, setNextQuestions] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);
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

    // if playlist and reached end of topic's # questions,
    // go to next topic

    if (playlist) {
      if (index === nextQuestions.length - 1) {
        // if we have reached end of playlist,

        // TODO: show topic summary

        // todo
        if (topicIndex === playlist.topics.length - 1) {
          // TODO: end of playlist
        } else {
          const questions = await fetchProblems(
            playlist.topics[topicIndex + 1].topic.id,
            playlist.topics[topicIndex + 1].noQuestions
          );

          setNextQuestions(questions.questions);

          setTopicIndex((prev) => prev + 1);

          setNoCorrect(0);
          setNoIncorrect(0);
          setIndex(0);
        }
      } else {
        setIndex((prev) => prev + 1);
      }
    }

    // if no playlist and reached past 10 questions,
    // fetch new 10 questions
    if (!playlist) {
      if (index === nextQuestions.length - 1) {
        const questions = await fetchProblems(topicId, 10);
        setNextQuestions(questions);
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }
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
