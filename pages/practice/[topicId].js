import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import CheckAnswerButton from "../../components/CheckAnswerButton";
import Timer from "../../components/Timer";
import TopicStatus from "../../components/TopicStatus";
import ProblemInput from "../../components/ProblemInput";
import ProblemLatex from "../../components/ProblemLatex";
import { useState, useEffect } from "react";

import Latex from "react-latex-next";

import Link from "next/link";

import {
  MdChevronLeft,
  MdHelpOutline,
  MdClear,
  MdCheck,
  MdChevronRight,
} from "react-icons/md";

import axios from "axios";

import { getSession } from "next-auth/react";

import { fetchNewProblem, verifyAnswer } from "../../_api/api";

function TopicPage() {
  const router = useRouter();
  const topicId = router.query.topicId;
  const [problem, setProblem] = useState(null);
  const [latexFields, setLatexFields] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);

  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const [index, setIndex] = useState(null);

  const [noQuestions, setNoQuestions] = useState(null);
  const [completedNumber, setCompletedNumber] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [incorrectNumber, setIncorrectNumber] = useState(0);
  useEffect(() => {
    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();

      if (topicId) {
        const newProblem = await fetchNewProblem(topicId);
        setProblem(newProblem);
        setLatexFields(new Array(newProblem.prompts.length).fill(""));
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
        const nextTopic = playlist.topics[parseInt(index) + 1];

        setCurrentPlaylist(playlist);
        console.log(playlist);
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
    setIsChecking(true);
    const isCorrect = await verifyAnswer(
      topicId,
      problem.latex,
      problem.stringVersion,
      latexFields
    );

    setIsChecking(false);

    if (isCorrect) {
      setCorrect(true);
      clearInputs();
      setCorrectNumber((prev) => prev + 1);

      if (noQuestions - completedNumber - 1 === 0) {
        setTimeout(() => redirectToNextTopic(), 500);
      }
    } else {
      setIncorrect(true);
      setIncorrectNumber((prev) => prev + 1);
      if (noQuestions - completedNumber - 1 === 0) {
        redirectToNextTopic();
        return;
      }
    }
    const newProblem = await fetchNewProblem(topicId);

    setProblem(newProblem);

    clearInputs();
    setCompletedNumber((prev) => prev + 1);
  };

  const skipProblem = async () => {
    if (noQuestions - completedNumber - 1 === 0) {
      redirectToNextTopic();
      return;
    }
    const newProblem = await fetchNewProblem(topicId);
    setProblem(newProblem);
    setCompletedNumber((prev) => prev + 1);
    setIncorrectNumber((prev) => prev + 1);
  };

  const clearInputs = () => {
    setLatexFields(new Array(problem.prompts.length).fill(""));
  };
  return (
    problem && (
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
              {currentPlaylist ? currentPlaylist.title : problem.title}
            </h3>
          </div>
        </Link>

        <div className="flex items-center justify-between mt-16 w-full lg:w-1/2">
          <div className="flex items-center">
            <h3 className="text-text dark:text-darkText font-bold text-xl">
              {problem.instructions}
            </h3>
            <h3
              className="text-primary dark:text-darkPrimary text-lg ml-4 cursor-pointer select-none"
              onClick={async () => await skipProblem()}
            >
              skip
            </h3>
          </div>
          {noQuestions && (
            <div className="flex flex-col items-end">
              <Timer />
              <TopicStatus
                remaining={noQuestions - completedNumber}
                correctNumber={correctNumber}
                incorrectNumber={incorrectNumber}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2 my-16 text-2xl lg:my-32">
          <ProblemLatex latex={problem.latex} />
        </div>

        <div className="flex items-center justify-between w-full lg:w-1/2">
          <div className="flex items-center">
            {latexFields.length > 0 && (
              <div className="flex flex-col ">
                {problem.prompts.map((prompt, i) => {
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
              verifyHandler={_verifyAnswer}
            />
          </div>
          <div className="text-text dark:text-darkText hover:text-primary dark:hover:text-darkPrimary">
            <MdHelpOutline size={35} className="cursor-pointer" />
          </div>
        </div>
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
