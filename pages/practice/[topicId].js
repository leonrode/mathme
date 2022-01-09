import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Sidebar from "../../components/Sidebar";
import Timer from "../../components/Timer";

import { useState, useEffect } from "react";

import Latex from "react-latex-next";

import Link from "next/link";

import { MdChevronLeft, MdHelpOutline } from "react-icons/md";

import axios from "axios";

const EditableMathField = dynamic(() => import("react-mathquill"), {
  ssr: false,
});

async function checkResponse(topicId, userResponse, questionLatex) {
  console.log(topicId, userResponse, questionLatex);
  const res = await axios.post("/api/verify", {
    topicId: parseInt(topicId),
    userResponse,
    questionLatex,
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

function TopicPage() {
  const router = useRouter();
  const topicId = router.query.topicId;
  const [latex, setLatex] = useState("");
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();

      if (topicId) {
        const newProblem = await fetchNewProblem(topicId);
        setProblem(newProblem);
      }
    })();
  }, [topicId]);

  return (
    problem && (
      <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
        <div className="flex w-5/6 z-0">
          <Sidebar activeIndex={-1} />
          <div className="flex flex-col py-24 w-screen items-start px-1/2 lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
            <Link href="/search">
              <div className="flex items-center cursor-pointer">
                <MdChevronLeft size={35} color="#000000" />
                <h3 className="text-text text-lg lg:text-xl ">
                  {problem.title}
                </h3>
              </div>
            </Link>

            <div className="flex items-center justify-between mt-16 w-full lg:w-1/2">
              <div className="flex items-center">
                <h3 className="text-text font-bold text-xl">
                  {problem.instructions}
                </h3>
                <h3
                  className="text-primary text-lg ml-4 cursor-pointer"
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
              <Latex>{`$${problem.latex}$`}</Latex>
            </div>

            <div className="flex items-center justify-between w-full lg:w-1/2 ">
              <div className="flex items-center">
                <Latex>{`$${problem.prompt}$`}</Latex>
                <div
                  onKeyPress={async (e) => {
                    if (e.key === "Enter" && latex !== "") {
                      const isCorrect = await checkResponse(
                        topicId,
                        latex,
                        problem.latex
                      );
                      if (isCorrect) {
                        const newProblem = await fetchNewProblem(topicId);
                        setProblem(newProblem);
                        setLatex("");
                      }
                    }
                  }}
                >
                  <EditableMathField
                    latex={latex}
                    id="math-input"
                    onChange={(mathField) => setLatex(mathField.latex())}
                  ></EditableMathField>
                </div>
                <div
                  className="bg-primary p-2 ml-4 text-white rounded-lg cursor-pointer"
                  onClick={async () => {
                    const isCorrect = await checkResponse(
                      topicId,
                      latex,
                      problem.latex
                    );

                    if (isCorrect) {
                      const newProblem = await fetchNewProblem(topicId);
                      setProblem(newProblem);

                      setLatex("");
                    }
                  }}
                >
                  Check
                </div>
              </div>
              <div className="text-text hover:text-primary">
                <MdHelpOutline size={35} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default TopicPage;
