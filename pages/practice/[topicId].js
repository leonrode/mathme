import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import CheckAnswerButton from "../../components/CheckAnswerButton";
import Timer from "../../components/Timer";
import TopicStatus from "../../components/TopicStatus";
import ProblemInput from "../../components/ProblemInput";
import ProblemLatex from "../../components/ProblemLatex";
import SummaryQuestion from "../../components/SummaryQuestion";
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

  const [isChecking, setIsChecking] = useState(false);

  const [incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);

  const [showTopicSummary, setShowTopicSummary] = useState(false);

  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const [completedQuestions, setCompletedQuestions] = useState([]);

  const [index, setIndex] = useState(null);

  const [noQuestions, setNoQuestions] = useState(10);
  const [completedNumber, setCompletedNumber] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [incorrectNumber, setIncorrectNumber] = useState(0);
  useEffect(() => {
    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();

      if (topicId) {
        const problems = await fetchProblems(topicId, noQuestions);

        setProblems(problems.questions);

        setLatexFields(
          new Array(problems.questions[0].prompts.length).fill("")
        );
      }
    })();
  }, [topicId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIncorrect(false);
      setCorrect(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [incorrect, correct]);

  useEffect(() => {
    const playlistId = router.query.playlistId;
    const index = router.query.index;

    setIndex(parseInt(index));

    (async () => {
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
  const redirectToNextTopic = () => {
    setCompletedNumber(0);
    setIncorrectNumber(0);
    setCorrectNumber(0);
    setShowTopicSummary(false);
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
      latexFields
    );
    setCompletedQuestions((questions) => [
      ...questions,
      {
        isCorrect: isCorrect,
        latex: problems[problemIndex].latex,
        userResponses: [...latexFields],
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
      if (noQuestions - completedNumber - 1 === 0) {
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
    setLatexFields(new Array(problems[problemIndex].prompts.length).fill(""));
  };
  return (
    problems && (
      <Layout activeIndex={-1}>
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
            <div className="flex items-center justify-between mt-16 w-full lg:w-1/2">
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
                {latexFields.length > 0 && (
                  <div className="flex flex-col ">
                    {problems[problemIndex].prompts.map((prompt, i) => {
                      return (
                        <ProblemInput
                          prompt={prompt}
                          index={i}
                          key={i}
                          incorrect={incorrect}
                          correct={correct}
                          latex={latexFields[i]}
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
          </>
        )}
        {showTopicSummary && (
          <div className="mt-4 w-full md:w-3/4">
            <h1 className="text-textGrayed">Topic Summary</h1>
            <div className="flex items-center">
              <h3 className="text-3xl font-bold mt-2">
                {currentPlaylist.topics[index].topic.title}
              </h3>
            </div>
            <div className="flex items-center mt-2">
              {/* percentage */}
              <h3 className="font-bold text-lg">
                {Math.floor((correctNumber / noQuestions) * 100)}%
              </h3>

              <h3 className="text-lg ml-4 text-success dark:text-darkSuccess flex items-center">
                {correctNumber}

                <MdCheck size={20} />
              </h3>
              <h3 className="ml-2 text-lg text-error dark:text-darkError flex items-center">
                {incorrectNumber}

                <MdClear size={20} />
              </h3>
            </div>
            <div className="flex items-center mt-2">
              <div
                onClick={restartTopic}
                className="cursor-pointer bg-transparent border-2 border-primary dark:border-darkPrimary w-fit p-2 text-sm rounded-md text-center"
              >
                Restart topic
              </div>
              <div
                onClick={redirectToNextTopic}
                className="cursor-pointer ml-2 bg-primary border-2 border-transparent dark:bg-darkPrimary w-fit p-2 text-sm rounded-md text-center"
              >
                Continue
              </div>
            </div>
            <h3 className="text-textGrayed my-4">Review Questions</h3>
            {completedQuestions.map((problem, index) => (
              <SummaryQuestion
                index={index}
                key={index}
                isLast={index === completedQuestions.length - 1}
                problemLatex={problem.latex}
                userResponses={problem.userResponses}
                solution={problem.solution}
                isCorrect={problem.isCorrect}
              />
            ))}
          </div>
        )}
      </Layout>
    )
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
