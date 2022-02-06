import Problem from "./Problem";
import TopicSummary from "./TopioSummary";
import { useState, useEffect } from "react";
import { fetchProblems, verifyAnswer } from "../_api/api";

function PracticeManager({ topicId, playlist }) {
  const [nextQuestions, setNextQuestions] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  const [index, setIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);

  const [noCorrect, setNoCorrect] = useState(0);
  const [noIncorrect, setNoIncorrect] = useState(0);

  const [showTopicSummary, setShowTopicSummary] = useState(false);
  useEffect(() => {
    (async () => {
      let questions;
      if (playlist) {
        questions = await fetchProblems(
          playlist.topics[topicIndex].topic.id,
          getNoQuestions(playlist.topics[topicIndex])
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
          setShowTopicSummary(true);
          return;
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

  const toContinue = async () => {
    // if reached last playlist,
    // todo
    if (topicIndex === playlist.topics.length - 1) {
      // TODO: end of playlist
    } else {
      const questions = await fetchProblems(
        playlist.topics[topicIndex + 1].topic.id,
        getNoQuestions(playlist.topics[topicIndex + 1])
      );

      setNextQuestions(questions.questions);

      setTopicIndex((prev) => prev + 1);

      setNoCorrect(0);
      setNoIncorrect(0);
      setIndex(0);

      setShowTopicSummary(false);
    }
  };

  const toRetry = async () => {
    setCompletedQuestions([]);
    const questions = await fetchProblems(
      playlist.topics[topicIndex].topic.id,
      getNoQuestions(playlist.topics[topicIndex])
    );

    setNextQuestions(questions.questions);

    setNoCorrect(0);
    setNoIncorrect(0);
    setIndex(0);

    setShowTopicSummary(false);
  };

  const getNoQuestions = (topic) => {
    if (!topic.isRandom) return topic.noQuestions;
    return topic.min + Math.floor(Math.random() * (topic.max + 1 - topic.min));
  };

  return (
    nextQuestions && (
      <>
        {showTopicSummary ? (
          <TopicSummary
            correctNumber={noCorrect}
            incorrectNumber={noIncorrect}
            noQuestions={playlist.topics[topicIndex].noQuestions}
            topicTitle={playlist.topics[topicIndex].title}
            completedQuestions={completedQuestions}
            toNextTopic={async () => await toContinue()}
            toRestart={async () => await toRetry()}
          />
        ) : (
          <Problem
            topicId={topicId}
            noQuestions={
              playlist ? playlist.topics[topicIndex].noQuestions : null
            }
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
        )}
      </>
    )
  );
}

export default PracticeManager;
