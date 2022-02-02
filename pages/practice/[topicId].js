import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import CheckAnswerButton from "../../components/CheckAnswerButton";
import Timer from "../../components/Timer";
import TopicStatus from "../../components/TopicStatus";
import ProblemInput from "../../components/ProblemInput";
import ProblemLatex from "../../components/ProblemLatex";
import SummaryQuestion from "../../components/SummaryQuestion";
import ProblemButton from "../../components/ProblemButton";
import TopicSummary from "../../components/TopioSummary";

import { useState, useEffect } from "react";

import Latex from "react-latex-next";

import Link from "next/link";

import {
  MdChevronLeft,
  MdHelpOutline,
  MdClear,
  MdCheck,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdStar,
  MdStarOutline,
} from "react-icons/md";

import axios from "axios";

import { getSession } from "next-auth/react";

import { fetchNewProblem, fetchProblems, verifyAnswer } from "../../_api/api";

function TopicPage() {
  const router = useRouter();
  const topicId = router.query.topicId;

  const [problems, setProblems] = useState(null);
  const [problemIndex, setProblemIndex] = useState(0);

  const [latexFields, setLatexFields] = useState([]);
  const [numFields, setNumFields] = useState(0);
  const [activeFieldIndex, setActiveFieldIndex] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const [incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);

  const [showTopicSummary, setShowTopicSummary] = useState(false);

  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const [completedQuestions, setCompletedQuestions] = useState([]);

  const [index, setIndex] = useState(null);

  const [isStarredTopic, setIsStarredTopic] = useState(false);

  const [noQuestions, setNoQuestions] = useState(10);
  const [completedNumber, setCompletedNumber] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [incorrectNumber, setIncorrectNumber] = useState(0);

  useEffect(() => {
    (async () => {
      if (topicId) {
        const problems = await fetchProblems(topicId, noQuestions);
        setProblems(problems.questions);
        setNumFields(problems.questions[0].numFields);
      }
    })();
  }, [topicId]);

  useEffect(() => {
    // to allow the animations to play, wait to
    // reverse the states
    const timeout = setTimeout(() => {
      setIncorrect(false);
      setCorrect(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [incorrect, correct]);

  useEffect(() => {
    const playlistId = router.query.playlistId;
    const index = router.query.index;

    const starred = router.query.starred;
    setIsStarredTopic(!!starred);

    setIndex(parseInt(index));

    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();

      if (playlistId) {
        const res = await axios.get(`/api/playlist/${playlistId}`);
        const playlist = res.data.playlist;

        const currentTopic = playlist.topics[parseInt(index)];

        setCurrentPlaylist(playlist);

        setNoQuestions(getNoQuestions(currentTopic));
      }
    })();
  }, []);

  const getNoQuestions = (topic) => {
    if (!topic.isRandom) return topic.noQuestions;
    return topic.min + Math.floor(Math.random() * (topic.max + 1 - topic.min));
  };

  const nextTopic = () => {
    setCompletedNumber(0);
    setIncorrectNumber(0);
    setCorrectNumber(0);
    setShowTopicSummary(false);
    console.log("next topic called");
    if (isStarredTopic) {
      const nextTopics = currentPlaylist.topics.slice(index + 1);
      console.log("is starred topc");
      const nextStarredTopics = nextTopics.filter((topic) => topic.isStarred);

      let nextTopicIndex;
      for (let i = index + 1; i < currentPlaylist.topics.length; i++) {
        if (currentPlaylist.topics[i].isStarred) {
          nextTopicIndex = i;
          break;
        }
      }

      if (nextTopicIndex) {
        console.log(
          "next topic",
          nextTopicIndex,
          currentPlaylist.topics[nextTopicIndex]
        );
        router.push(
          `/practice/${currentPlaylist.topics[nextTopicIndex].topic.id}?playlistId=${currentPlaylist._id}&index=${nextTopicIndex}&starred=true`
        );

        return;
      } else {
        // TODO: finished starred playlist
      }
    }

    const nextTopic = currentPlaylist.topics[index + 1];

    if (nextTopic) {
      router.push(
        `/practice/${nextTopic.topic.id}?playlistId=${
          currentPlaylist._id
        }&index=${index + 1}`
      );
    } else {
      // TODO: finished playlist
    }
  };

  const _verifyAnswer = async () => {
    if (isChecking) return; // prevent spamming
    setIsChecking(true);
    const isCorrect = await verifyAnswer(
      topicId,
      problems[problemIndex].latex,
      problems[problemIndex].stringVersion,
      latexFields.map((field) => {
        console.log(field);
        return field.latex();
      })
    );
    setCompletedQuestions((questions) => [
      ...questions,
      {
        isCorrect: isCorrect,
        latex: problems[problemIndex].latex,
        userResponses: latexFields.map((field) => {
          console.log("field", field.latex());
          return field.latex();
        }),
        solution: problems[problemIndex].solution,
      },
    ]);

    setIsChecking(false);

    if (isCorrect) {
      setCorrect(true);

      setCorrectNumber((prev) => prev + 1);

      if (noQuestions - completedNumber - 1 === 0) {
        setTimeout(() => setShowTopicSummary(true), 500);
        return;
        // setTimeout(() => redirectToNextTopic(), 500);
      }
    } else {
      setIncorrect(true);
      setIncorrectNumber((prev) => prev + 1);
      if (currentPlaylist && noQuestions - completedNumber - 1 === 0) {
        setTimeout(() => setShowTopicSummary(true), 500);
        return;
      }
    }

    if (problemIndex === problems.length - 1) {
      const newProblems = await fetchProblems(topicId, noQuestions);
      setProblems(newProblems.questions);
      setProblemIndex(0);
    } else {
      setProblemIndex((prev) => prev + 1);
    }
    clearInputs();
    setCompletedNumber((prev) => prev + 1);
  };

  const skipProblem = async () => {
    setCompletedQuestions((questions) => [
      ...questions,
      {
        isCorrect: false,
        latex: problems[problemIndex].latex,
        userResponses: ["Skipped"],
        solution: problems[problemIndex].solution,
      },
    ]);

    if (currentPlaylist && noQuestions - completedNumber - 1 === 0) {
      setShowTopicSummary(true);
    }

    if (problemIndex === problems.length - 1) {
      const newProblems = await fetchProblems(topicId, noQuestions);
      setProblems(newProblems.questions);
      setProblemIndex(0);

      return;
    }

    setProblemIndex((prev) => prev + 1);
    setCompletedNumber((prev) => prev + 1);
    setIncorrectNumber((prev) => prev + 1);
  };

  const restartTopic = () => {
    setCompletedQuestions(0);
    setCorrectNumber(0);
    setIncorrectNumber(0);
    setProblemIndex(0);

    setShowTopicSummary(false);
  };

  const clearInputs = () => {
    // setLatexFields((fields) => ));
    console.log(latexFields);
    latexFields.forEach((field) => field.latex(""));
  };
  return (
    <Layout activeIndex={-1}>
      {problems && (
        <>
          <Link
            href={
              currentPlaylist ? `/playlist/${currentPlaylist._id}` : "/search"
            }
          >
            <div className="flex items-center cursor-pointer">
              <div className="text-text dark:text-darkText">
                <MdChevronLeft size={35} />
              </div>
              <h3 className="text-text dark:text-darkText text-lg lg:text-xl ">
                {currentPlaylist
                  ? currentPlaylist.title
                  : problems[problemIndex].title}
              </h3>
            </div>
          </Link>

          {!showTopicSummary && (
            <>
              <h5 className="text-textGrayed mt-8 mb-2">Up now</h5>
              <div className="flex items-center mb-8">
                {isStarredTopic ? (
                  <MdStar
                    className="text-warning dark:text-darkWarning"
                    size={30}
                  />
                ) : null}
                <h1
                  className={`${
                    isStarredTopic ? "ml-2" : ""
                  } text-2xl font-bold `}
                >
                  {problems[problemIndex].title}
                </h1>
              </div>
              <div className="flex items-center justify-between w-full lg:w-1/2">
                <div className="flex items-center">
                  <h3 className="text-text dark:text-darkText font-bold text-xl">
                    {problems[problemIndex].instructions}
                  </h3>
                  <h3
                    className="text-primary dark:text-darkPrimary text-lg ml-4 cursor-pointer select-none"
                    onClick={() => skipProblem()}
                  >
                    skip
                  </h3>
                </div>

                <div className="flex flex-col items-end">
                  <Timer />
                  {currentPlaylist && (
                    <TopicStatus
                      remaining={noQuestions - completedNumber}
                      correctNumber={correctNumber}
                      incorrectNumber={incorrectNumber}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center w-full lg:w-1/2 my-16 text-2xl lg:my-32">
                <ProblemLatex latex={problems[problemIndex].latex} />
              </div>

              <div className="flex items-center justify-between w-full lg:w-1/2">
                <div className="flex items-center">
                  {numFields > 0 && (
                    <div className="flex flex-col ">
                      {problems[problemIndex].prompts.map((prompt, i) => {
                        return (
                          <ProblemInput
                            prompt={prompt}
                            index={i}
                            key={i}
                            isActive={activeFieldIndex === i}
                            setActive={(index) => setActiveFieldIndex(index)}
                            setInactive={(index) => setActiveFieldIndex(0)}
                            incorrect={incorrect}
                            correct={correct}
                            latex={latexFields[i] ? latexFields[i].latex() : ""}
                            // latex=""
                            setter={setLatexFields}
                            checkHandler={async () => await _verifyAnswer()}
                          />
                        );
                      })}
                    </div>
                  )}

                  <CheckAnswerButton
                    correct={correct}
                    incorrect={incorrect}
                    isChecking={isChecking}
                    verifyHandler={_verifyAnswer}
                  />
                </div>
                <div className="text-text dark:text-darkText hover:text-primary dark:hover:text-darkPrimary">
                  <MdHelpOutline size={35} className="cursor-pointer" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {problems[problemIndex].buttons.map((button, index) => (
                  <ProblemButton
                    key={index}
                    index={index}
                    toClick={() =>
                      latexFields[activeFieldIndex].write(button.cmd)
                    }
                    content={button.ui}
                  />
                ))}
              </div>
            </>
          )}
          {showTopicSummary && (
            <TopicSummary
              correctNumber={correctNumber}
              incorrectNumber={incorrectNumber}
              topicTitle={problems[problemIndex].title}
              noQuestions={noQuestions}
              completedQuestions={completedQuestions}
              toRestart={restartTopic}
              toNextTopic={nextTopic}
            />
          )}
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: session,
  };
}

export default TopicPage;
