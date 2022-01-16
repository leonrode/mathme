import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import { MdEdit } from "react-icons/md";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import CreateSearchResult from "../components/CreateSearchResult";
import AddedTopic from "../components/AddedTopic";
import MiniSpinner from "../components/MiniSpinner";
import { getSession } from "next-auth/react";
function Create() {
  const [results, setResults] = useState([]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [resultsLoading, setResultsLoading] = useState(true);
  const [addedTopics, setAddedTopics] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingPlaylistNo, setIsFetchingPlaylistNo] = useState(true);
  const [playlistNo, setPlaylistNo] = useState(null);
  const Router = useRouter();

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

  useEffect(() => {
    (async () => {
      setIsFetchingPlaylistNo(true);
      const res = await axios.get(`/api/user/playlists`);
      const playlists = res.data.playlists;

      setPlaylistNo(playlists.length);
      setIsFetchingPlaylistNo(false);
    })();
  }, []);

  const addTopic = (topic, noQuestions, isRandom, min, max) => {
    const _topic = {
      topic: topic,
    };

    if (isRandom) {
      _topic.randomNumberOfQs = true;
      _topic.randomMin = min;
      _topic.randomMax = max;
    } else {
      _topic.randomNumberOfQs = false;
      _topic.noQuestions = noQuestions;
    }
    setAddedTopics((topics) => [...topics, _topic]);
  };

  const changeHandler = (index, newObject) => {
    setAddedTopics((topics) => [
      ...topics.slice(0, index),
      newObject,
      ...topics.slice(index + 1),
    ]);
  };

  const removeTopic = (index) => {
    console.log(index);
    setAddedTopics((topics) => [
      ...topics.slice(0, index),
      ...topics.slice(index + 1),
    ]);
  };

  const moveTopicUp = (index) => {
    if (index !== 0) {
      setAddedTopics((topics) => [
        ...topics.slice(0, index - 1),
        topics[index],
        topics[index - 1],
        ...topics.slice(index + 1),
      ]);
    }
  };
  const moveTopicDown = (index) => {
    if (index !== addedTopics.length - 1) {
      setAddedTopics((topics) => [
        ...topics.slice(0, index),
        topics[index + 1],
        topics[index],
        ...topics.slice(index + 2),
      ]);
    }
  };
  return (
    playlistNo !== null && (
      <Layout activeIndex={3}>
        <div className="flex items-center">
          <input
            className="text-3xl lg:text-5xl text-text dark:text-darkText rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-b-textGrayed border-b-2 focus:border-b-primary focus:dark:border-b-darkPrimary dark:placeholder:text-textGrayed  transition"
            type="text"
            placeholder={`My New Playlist #${playlistNo + 1}`}
            onChange={(e) => setPlaylistTitle(e.target.value)}
          ></input>
          <div className="text-text dark:text-darkText ml-2 lg:ml-4">
            <MdEdit size={30} />
          </div>
          <div
            onClick={async () =>
              savePlaylist(
                playlistNo + 1,
                playlistTitle,
                addedTopics,
                setIsSaving,
                Router
              )
            }
            className="hidden md:block bg-primary dark:bg-darkPrimary text-white rounded-xl px-4 py-2 font-bold ml-4 text-xl cursor-pointer "
          >
            {isSaving ? (
              <svg
                className="animate-spin h-6 w-6 text-primary dark:text-darkPrimary "
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
            ) : (
              "Save"
            )}
          </div>
        </div>
        <h3 className="text-textGrayed mt-4">by Leon Rode</h3>
        <div className=" md:hidden bg-primary dark:bg-darkPrimary text-white dark:text-darkText rounded-xl px-4 py-2 font-bold text-xl cursor-pointer mt-4">
          Save
        </div>
        <div className="w-full flex flex-col lg:w-3/4 mt-4">
          {addedTopics.map((topic, i) => (
            <AddedTopic
              topic={topic.topic}
              removeHandler={removeTopic}
              changeHandler={changeHandler}
              moveUpHandler={moveTopicUp}
              moveDownHandler={moveTopicDown}
              index={i}
              isLast={i === addedTopics.length - 1}
              key={i}
            />
          ))}
        </div>

        <h3 className="text-text dark:text-darkText text-lg mt-4 md:mt-8">
          Start by searching for some topics
        </h3>

        <div className="flex w-full items-center mt-4 lg:w-3/4 relative">
          <input
            className="border-2 border-textGrayed dark:bg-darkElevated bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:dark:border-darkPrimary dark:placeholder:text-textGrayed focus:border-2 w-full text-text dark:text-darkText text-lg  transition-[border]"
            type="text"
            placeholder="Search for a topic"
            onChange={(e) => {
              setInputPrompt(e.target.value);
            }}
          />
          {resultsLoading && <MiniSpinner />}
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
      </Layout>
    )
  );
}

async function savePlaylist(playlistNo, title, topics, setIsSaving, Router) {
  if (title === "") title = `My New Playlist #${playlistNo}`;
  setIsSaving(true);
  console.log(topics);
  const res = await axios.post("/api/playlist/create", { title, topics });
  setIsSaving(false);
  Router.push(`/playlist/${res.data.playlistId}`);
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

export default Create;
