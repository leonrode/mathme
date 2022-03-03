import { randomCompletetionMessage } from "../lib/helpers";

import CompletedTopic from "./CompletedTopic";

function PlaylistSummary({ playlistTitle, completedTopics }) {
  return (
    <div className="w-full md:w-5/6">
      <h1 className="font-bold text-3xl">{randomCompletetionMessage()}</h1>
      <h3 className="text-textGrayed mt-2">
        You finished all the topics! Let's review what you got wrong.
      </h3>

      <h3 className="font-bold my-4">Studied topics</h3>
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
