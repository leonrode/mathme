import Sidebar from "../components/Sidebar";

import { MdEdit } from "react-icons/md";

import { useState, useEffect } from "react";
import axios from "axios";

import CreateSearchResult from "../components/CreateSearchResult";
import AddedTopic from "../components/AddedTopic";
function Create() {
  const [results, setResults] = useState([]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [resultsLoading, setResultsLoading] = useState(true);
  const [addedTopics, setAddedTopics] = useState([]);

  useEffect(() => {
    let reqPrompt = inputPrompt;
    if (reqPrompt === "") {
      reqPrompt = "all";
    }

    (async () => {
      setResultsLoading(true);
      const res = await axios.get(`/api/search?prompt=${reqPrompt}`);
      const data = res.data;
      setResults(data.results);
      setResultsLoading(false);
    })();
  }, [inputPrompt]);

  const addTopic = (topic) =>
    setAddedTopics((topics) => {
      if (!topics.includes(topic)) return [...topics, topic];
      return topics;
    });
  const removeTopic = (topic) =>
    setAddedTopics((topics) => topics.filter((_topic) => _topic !== topic));
  return (
    <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
      <div className="flex w-5/6 z-0">
        <Sidebar activeIndex={-1} />
        <div className="flex flex-col py-24 w-full items-start px-1/2 lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
          <div className="flex items-center">
            <input
              className="text-3xl lg:text-5xl text-text rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-b-textGrayed border-b-2 focus:border-b-primary  transition"
              type="text"
              placeholder="My New Playlist #55"
            ></input>
            <MdEdit size={30} color="#000000" className=" ml-2 lg:ml-4" />
          </div>
          <h3 className="text-textGrayed mt-4">by Leon Rode</h3>
          <div className="lg:w-3/4 w-full flex flex-col mt-4 ">
            {addedTopics.map((topic) => (
              <AddedTopic topic={topic} removeHandler={removeTopic} />
            ))}
          </div>
          <h3 className="text-text text-lg mt-8">
            Start by searching for some topics
          </h3>

          <div className="flex w-full items-center mt-4 lg:w-3/4 relative">
            <input
              className="border-2 border-textGrayed bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:border-2 w-full text-black text-lg  transition-[border]"
              type="text"
              placeholder="Search for a topic"
              onChange={(e) => {
                setInputPrompt(e.target.value);
              }}
            />
            {resultsLoading && (
              <svg
                className="animate-spin h-6 w-6 text-primary absolute right-0 mr-3"
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
            )}
          </div>
          <div className="flex justify-between w-full lg:w-3/4 px-2 md:px-8 my-4 ">
            <div className="flex w-1/2">
              <h3 className="text-textGrayed ">Topic</h3>
            </div>
            <div className="flex w-1/2 justify-start">
              <h3 className="text-textGrayed">Example</h3>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-3/4 mt-2">
            {results.map((result) => (
              <CreateSearchResult
                topic={result}
                key={result.meta.title}
                addHandler={addTopic}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
