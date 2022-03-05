import { MdKeyboardArrowDown } from "react-icons/md";

import { useState } from "react";
import Latex from "react-latex-next";
function CompletedTopic({ number, topic }) {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(topic);
  console.log(topic.completedQuestions);
  return (
    <div className="flex flex-col">
      {/* header part  */}
      <div
        onClick={() => setShowDropdown((prev) => !prev)}
        className="cursor-pointer h-16 px-4 rounded-xl bg-white dark:bg-darkElevated flex items-center justify-between w-full"
      >
        <div className="flex items-center">
          <h3 className="text-textGrayed">{number}</h3>
          <h3 className="ml-4 font-bold select-none">{topic.title}</h3>
        </div>
        <MdKeyboardArrowDown size={30} />
      </div>
      {/* topic questions part  */}
      <div
        className={`${
          showDropdown ? "max-h-96" : "max-h-0 "
        } origin-top mb-4 overflow-hidden transition-all`}
      >
        {/* topic question  */}
        {topic.completedQuestions.map((question, index) => (
          <div
            className="ml-8 rounded-lg my-2 flex items-center px-4 bg-white dark:bg-darkElevated w-full h-14"
            key={index}
          >
            <h3 className="text-textGrayed">{index + 1}</h3>

            <h3 className="text-textGrayed ml-4 text-sm">Question</h3>
            <div className="ml-4">
              <Latex>{`$${question.latex}$`}</Latex>
            </div>
            <h3 className="text-textGrayed ml-4 text-sm">You Responded</h3>
            <div className="ml-2">
              <Latex>{`$${question.userResponses[0]}$`}</Latex>
            </div>
            <h3 className="text-textGrayed ml-4 text-sm">Correct Answer</h3>
            <div className="ml-2">
              <Latex>{`$${question.solution}$`}</Latex>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedTopic;
