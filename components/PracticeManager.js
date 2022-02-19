import Problem from "./Problem";
import TopicSummary from "./TopioSummary";
import { useState, useEffect } from "react";
import { fetchProblems, verifyAnswer } from "../_api/api";

function PracticeManager({ topicId, playlist, starred }) {
  const [nextQuestions, setNextQuestions] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  const [index, setIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);

  const [noCorrect, setNoCorrect] = useState(0);
  const [noIncorrect, setNoIncorrect] = useState(0);

  const [showTopicSummary, setShowTopicSummary] = useState(false);
  useEffect(() => {
    if (starred && playlist) {
      // set topic index to the first topic that is starred
      const nextStarredTopic = getNextStarredTopicIndex(playlist.topics, 0);

      if (nextStarredTopic > 0) {
        setTopicIndex(nextStarredTopic);
      }
    }

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

  const getNextStarredTopicIndex = (topics, start) => {
    for (let i = start; i < topics.length; i++) {
      if (topics[i].isStarred) {
        return i;
      }
    }

    return -1;
  };

  const onQuestionAnswer = async (isCorrect, problem, latexFields) => {
    setCompletedQuestions((prev) => [
      ...prev,
      {
        isCorrect: isCorrect,
        latex: problem.latex,
        userResponses: latexFields.map((field) => {
          if (field !== "SKIP") return field.latex();
          return "Skipped";
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
        // if reached end of playlist
        if (topicIndex === playlist.topics.length - 1) {
          // TODO: end of playlist
        } else {
          // else if reached end of topic
          console.log("here");
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
      if (index === nextQuestions.length - 2) {
        const questions = await fetchProblems(topicId, 10);
        console.log(questions);

        setNextQuestions(questions);
      } else if (index === nextQuestions.length - 1) {
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
      let nextIndex = topicIndex + 1;
      if (starred) {
        const nextStarredTopicIndex = getNextStarredTopicIndex(
          playlist.topics,
          topicIndex + 1
        );

        console.log("nsti", nextStarredTopicIndex);

        if (nextStarredTopicIndex !== -1) {
          nextIndex = nextStarredTopicIndex;
        }
      }

      console.log("nextIndex", nextIndex);

      const questions = await fetchProblems(
        playlist.topics[nextIndex].topic.id,
        getNoQuestions(playlist.topics[nextIndex])
      );

      setNextQuestions(questions.questions);

      setTopicIndex(nextIndex);

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
