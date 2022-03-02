import Question from "./Question";
import TopicSummary from "./TopicSummary";
import { useState, useEffect } from "react";
import { fetchQuestions, fetchMixedQuestions } from "../_api/api";

import { MdDone } from "react-icons/md";

function PracticeManager({ topicId, playlist, hasPlaylist, starred, shuffle }) {
  const [nextQuestions, setNextQuestions] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);

  const [noCorrect, setNoCorrect] = useState(0);
  const [noIncorrect, setNoIncorrect] = useState(0);

  const [showTopicSummary, setShowTopicSummary] = useState(false);
  useEffect(() => {
    if (starred && hasPlaylist) {
      // set topic index to the first topic that is starred
      const nextStarredTopic = getNextStarredTopicIndex(playlist.topics, 0);

      if (nextStarredTopic > 0) {
        setTopicIndex(nextStarredTopic);
      }
    }

    (async () => {
      let questions;
      if (hasPlaylist) {
        if (shuffle) {
          // TODO: GET MIX OF QUESTIONS
          questions = await fetchMixedQuestions(playlist.slug, 10);
        } else if (starred) {
          const nextStarredTopic = getNextStarredTopicIndex(playlist.topics, 0);

          questions = await fetchQuestions(
            playlist.topics[nextStarredTopic].topic.id,
            getNoQuestions(playlist.topics[nextStarredTopic])
          );
        } else {
          questions = await fetchQuestions(
            playlist.topics[topicIndex].topic.id,
            getNoQuestions(playlist.topics[topicIndex])
          );
        }
      } else {
        questions = await fetchQuestions(topicId, 10);
      }

      setNextQuestions(questions);
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

  const onQuestionAnswer = async (isCorrect, question, latexFields) => {
    setCompletedQuestions((prev) => [
      {
        isCorrect: isCorrect,
        latex: question.latex,
        userResponses: latexFields.map((field) => {
          if (field !== "SKIP") return field.latex();
          return "Skipped";
        }),
        solution: question.solution,
      },
      ...prev,
    ]);
    isCorrect
      ? setNoCorrect((prev) => prev + 1)
      : setNoIncorrect((prev) => prev + 1);

    // if playlist and reached end of topic's # questions,
    // go to next topic

    if (hasPlaylist) {
      if (index === nextQuestions.length - 1) {
        // if reached end of playlist
        if (topicIndex === playlist.topics.length - 1) {
          // TODO: end of playlist
        } else {
          // else if reached end of topic

          if (!shuffle) {
            setShowTopicSummary(true);
            return;
          } else {
            const questions = await fetchMixedQuestions(playlist.slug, 10);
            setNextQuestions(questions);
            setIndex(0);
          }
        }
      } else {
        setIndex((prev) => prev + 1);
      }
    }

    // if no playlist and reached past 10 questions,
    // fetch new 10 questions
    else {
      if (index === nextQuestions.length - 2) {
        const questions = await fetchQuestions(topicId, 10);
        setNextQuestions(questions);
      } else if (index === nextQuestions.length - 1) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }
  };

  const toContinue = async () => {
    // if not in playlist, the user is just viewing the history of completed questions

    if (!hasPlaylist || shuffle) {
      setShowTopicSummary(false);
      return;
    }

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

        if (nextStarredTopicIndex !== -1) {
          nextIndex = nextStarredTopicIndex;
        }
      }

      const questions = await fetchQuestions(
        playlist.topics[nextIndex].topic.id,
        getNoQuestions(playlist.topics[nextIndex])
      );

      setCompletedQuestions([]);

      setNextQuestions(questions);

      setTopicIndex(nextIndex);

      setNoCorrect(0);
      setNoIncorrect(0);
      setIndex(0);

      setShowTopicSummary(false);
    }
  };

  const toRetry = async () => {
    setCompletedQuestions([]);
    const questions = await fetchQuestions(
      playlist.topics[topicIndex].topic.id,
      getNoQuestions(playlist.topics[topicIndex])
    );

    setNextQuestions(questions);

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
            noQuestions={
              noCorrect + noIncorrect === 0 ? 1 : noCorrect + noIncorrect
            }
            topicTitle={hasPlaylist ? playlist.topics[topicIndex].title : ""}
            completedQuestions={completedQuestions}
            toNextTopic={async () => await toContinue()}
            toRestart={async () => await toRetry()}
            canRestart={hasPlaylist && !shuffle}
          />
        ) : (
          <>
            {!hasPlaylist || shuffle ? (
              <div
                onClick={() => setShowTopicSummary(true)}
                className="cursor-pointer mb-4 flex items-center text-primary dark:text-darkPrimary"
              >
                <MdDone size={20} className="mr-2" /> See completed questions
              </div>
            ) : null}
            <Question
              topicId={
                hasPlaylist ? playlist.topics[topicIndex].topic.id : topicId
              }
              noQuestions={
                hasPlaylist && !shuffle
                  ? playlist.topics[topicIndex].noQuestions
                  : null
              }
              noCorrect={noCorrect}
              noIncorrect={noIncorrect}
              question={nextQuestions[index]}
              onCorrect={async (question, latexFields) =>
                await onQuestionAnswer(true, question, latexFields)
              }
              onIncorrect={async (question, latexFields) =>
                await onQuestionAnswer(false, question, latexFields)
              }
            />
          </>
        )}
      </>
    )
  );
}

export default PracticeManager;
