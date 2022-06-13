import { randomCompletetionMessage } from "../lib/helpers";

import { MdRestartAlt, MdArrowForward } from "react-icons/md";

import CompletedTopic from "./CompletedTopic";

function PlaylistSummary({
  playlistTitle,
  completedTopics,
  toPlaylist,
  toPracticeAgain,
}) {
  const message = randomCompletetionMessage();

  return (
    <div className="w-full md:w-5/6">
      <h1 className="font-bold text-3xl">{message}</h1>
      <h3 className="text-textGrayed mt-2">
        You finished all the topics! Let&apos;s review what you got wrong.
      </h3>

      <div className="flex items-center my-4">
        <div
          onClick={toPracticeAgain}
          className="flex items-center text-text dark:text-darkText cursor-pointer bg-transparent border-2 border-primary dark:border-darkPrimary w-fit p-2 text-sm rounded-md text-center"
        >
          <MdRestartAlt size={20} className="mr-1" />
          Practice Again
        </div>
        <div
          onClick={toPlaylist}
          className="flex items-center cursor-pointer text-darkText ml-2 bg-primary border-2 border-transparent dark:bg-darkPrimary w-fit p-2 text-sm rounded-md text-center"
        >
          Back to Playlist
          <MdArrowForward size={20} className="ml-1" />
        </div>
      </div>

      <h3 className="font-bold my-4 text-text dark:text-darkText">
        Studied topics
      </h3>
      {completedTopics.map((topic, index) => (
        <CompletedTopic
          number={index + 1}
          key={index}
          topic={topic}
          title={playlistTitle}
        /> // this represents one completed topic within the completedTopics
      ))}
    </div>
  );
}

export default PlaylistSummary;
