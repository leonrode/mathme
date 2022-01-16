import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import Timer from "../../components/Timer";
import ProblemInput from "../../components/ProblemInput";
import { useState, useEffect } from "react";

import Latex from "react-latex-next";

import Link from "next/link";

import { MdChevronLeft, MdHelpOutline, MdClear, MdCheck } from "react-icons/md";

import axios from "axios";

import { getSession } from "next-auth/react";

async function checkResponse(
  topicId,
  questionLatex,
  questionString,
  responseFields
) {
  const res = await axios.post("/api/verify", {
    topicId: parseInt(topicId),
    responseFields,
    responseFields,
    questionLatex: questionLatex,
    questionString: questionString,
  });

  const { isCorrect } = res.data;
  console.log(isCorrect);
  return isCorrect;
}

async function fetchNewProblem(topicId) {
  const res = await axios.get(`/api/question/${parseInt(topicId)}`);
  const data = res.data;
  console.log(data);
  return data;
}

async function clearInputs(setter) {}
function TopicPage() {
  const router = useRouter();
  const topicId = router.query.topicId;
  const [problem, setProblem] = useState(null);
  const [latexFields, setLatexFields] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);
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

  return (
    problem && (
      <Layout activeIndex={-1}>
        <Link href="/search">
          <div className="flex items-center cursor-pointer">
            <div className="text-text dark:text-darkText">
              <MdChevronLeft size={35} />
            </div>
            <h3 className="text-text dark:text-darkText text-lg lg:text-xl ">
              {problem.title}
            </h3>
          </div>
        </Link>

        <div className="flex items-center justify-between mt-16 w-full lg:w-1/2">
          <div className="flex items-center">
            <h3 className="text-text dark:text-darkText font-bold text-xl">
              {problem.instructions}
            </h3>
            <h3
              className="text-primary dark:text-darkPrimary text-lg ml-4 cursor-pointer"
              onClick={async () => {
                const newProblem = await fetchNewProblem(topicId);
                setProblem(newProblem);
              }}
            >
              skip
            </h3>
          </div>
          <Timer />
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2 my-16 text-2xl lg:my-32">
          <div className="scale-150">
            <Latex>{`$${problem.latex}$`}</Latex>
          </div>
        </div>

        <div className="flex items-center justify-between w-full lg:w-1/2">
          <div className="flex items-center">
            {latexFields.length > 0 && (
              <div className="flex flex-col ">
                {problem.prompts.map((prompt, i) => {
                  // console.log(latexFields, i, latexFields[i]);
                  // console.log(latexFields);
                  return (
                    <ProblemInput
                      prompt={prompt}
                      index={i}
                      key={i}
                      incorrect={incorrect}
                      correct={correct}
                      _latexList={latexFields}
                      setter={setLatexFields}
                    />
                  );
                })}
              </div>
            )}

            <div
              className={`${
                incorrect
                  ? "bg-error dark:bg-darkError"
                  : correct
                  ? "bg-success"
                  : "bg-primary dark:bg-darkPrimary"
              } p-2 ml-4 flex flex-col items-center justify-center text-white rounded-lg cursor-pointer transition duration-500`}
              onClick={async () => {
                setIsChecking(true);
                // console.log(latexFields);
                const isCorrect = await checkResponse(
                  topicId,
                  problem.latex,
                  problem.stringVersion,
                  latexFields
                );

                if (isCorrect) {
                  const newProblem = await fetchNewProblem(topicId);
                  clearInputs();
                  setCorrect(true);
                  setProblem(newProblem);
                  // console.log(latexFields);

                  setLatexFields(new Array(newProblem.prompts.length).fill(""));
                } else {
                  setIncorrect(true);
                }
                setIsChecking(false);
              }}
            >
              {isChecking ? (
                <svg
                  className="animate-spin h-6 w-6 text-primary dark:text-darkPrimary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#CDD1DB"
                    strokeWidth="4"
                  ></circle>
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : incorrect ? (
                <MdClear className="text-darkText" size={25} />
              ) : correct ? (
                <MdCheck className="text-darkText" size={25} />
              ) : (
                "Check"
              )}
            </div>
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
