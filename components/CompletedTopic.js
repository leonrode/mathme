import { MdKeyboardArrowDown } from "react-icons/md";

import { useState } from "react";
import Latex from "react-latex-next";
function CompletedTopic({ number, topic, title }) {
  const [showDropdown, setShowDropdown] = useState(false);
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
          <h3 className="ml-4 font-bold">{title}</h3>
        </div>
        <MdKeyboardArrowDown size={30} />
      </div>
      {/* topic questions part  */}
      <div
        className={`${
          showDropdown ? "h-14" : "h-0 "
        } origin-top mb-4 overflow-hidden transition-all`}
      >
        {/* topic question  */}
        {topic.completedQuestions.map((question, index) => (
          <div key={index}>
            <Latex>{`$${question.solution}$`}</Latex>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedTopic;
