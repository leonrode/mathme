import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Sidebar from "../../components/Sidebar";

import { useState, useEffect } from "react";

import Latex from "react-latex-next";

import Link from "next/link";

import { MdChevronLeft, MdHelpOutline } from "react-icons/md";

import axios from "axios";

const EditableMathField = dynamic(() => import("react-mathquill"), {
  ssr: false,
});

async function checkResponse(id, responseLatex, questionLatex) {
  console.log(id, responseLatex, questionLatex);
  const res = await axios.post("http://localhost:5000/api/verify", {
    type_id: id,
    userResponse: responseLatex,
    questionLatex: questionLatex,
  });

  const { isCorrect } = res.data;
  return isCorrect;
}

async function fetchNewProblem(id) {
  const res = await axios.get(`http://localhost:5000/api/question/${id}`);
  const data = res.data;
  return data;
}

function TopicPage() {
  const router = useRouter();
  const topic = router.query.topic;
  const [latex, setLatex] = useState("");
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();

      if (topic) {
        const newProblem = await fetchNewProblem(topic);
        setProblem(newProblem);
      }
    })();
  }, [topic]);

  return (
    problem && (
      <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
        <div className="flex w-5/6 z-0">
          <Sidebar activeIndex={-1} />
          <div className="flex flex-col py-24 w-screen items-start px-1/2 lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
            <Link href="http://localhost:3000/search">
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
                <h3 className="text-primary text-lg ml-4 lg:cursor-pointer">
                  skip
                </h3>
              </div>
              <h3 className="text-text text-xl">12:39</h3>
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2 my-16 text-2xl lg:my-32">
              <Latex>{`$${problem.latex}$`}</Latex>
            </div>

            <div className="flex items-center justify-between w-full lg:w-1/2 ">
              <div className="flex items-center">
                <Latex>{`$${problem.prompt}$`}</Latex>
                <EditableMathField
                  latex={latex}
                  id="math-input"
                  onChange={(mathField) => setLatex(mathField.latex())}
                ></EditableMathField>
                <div
                  className="bg-primary p-2 ml-4 text-white rounded-lg cursor-pointer"
                  onClick={async () => {
                    const isCorrect = checkResponse(
                      topic,
                      latex,
                      problem.latex
                    );

                    if (isCorrect) {
                      const newProblem = await fetchNewProblem(topic);
                      setProblem(newProblem);

                      setLatex("");
                    }
                  }}
                >
                  Check
                </div>
              </div>
              <div className="">
                <MdHelpOutline
                  size={35}
                  color="#2356F7"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default TopicPage;
