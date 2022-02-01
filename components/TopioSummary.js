import SummaryQuestion from "./SummaryQuestion";

import { MdClear, MdCheck } from "react-icons/md";

function TopicSummary({
  topicTitle,
  correctNumber,
  incorrectNumber,
  noQuestions,
  completedQuestions,
  toRestart,
  toNextTopic,
}) {
  return (
    <div className="mt-4 w-full md:w-3/4">
      <h1 className="text-textGrayed">Topic Summary</h1>
      <div className="flex items-center">
        <h3 className="text-3xl font-bold mt-2">{topicTitle}</h3>
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
          onClick={toRestart}
          className="cursor-pointer bg-transparent border-2 border-primary dark:border-darkPrimary w-fit p-2 text-sm rounded-md text-center"
        >
          Restart topic
        </div>
        <div
          onClick={toNextTopic}
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
  );
}

export default TopicSummary;
