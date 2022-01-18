import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import { MdEdit } from "react-icons/md";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import CreateSearchResult from "../components/CreateSearchResult";
import AddedTopic from "../components/AddedTopic";

import { getSession } from "next-auth/react";

import { searchTopics, getUserPlaylists, savePlaylist } from "../api/api";
function Create() {
  const [results, setResults] = useState([]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [resultsLoading, setResultsLoading] = useState(true);
  const [addedTopics, setAddedTopics] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [playlistNo, setPlaylistNo] = useState(null);
  const Router = useRouter();

  useEffect(() => {
    (async () => {
      setResultsLoading(true);

      const results = await searchTopics(inputPrompt);
      setResults(results);

      setResultsLoading(false);
    })();
  }, [inputPrompt]);

  useEffect(() => {
    (async () => {
      const playlists = await getUserPlaylists();

      setPlaylistNo(playlists.length);
    })();
  }, []);

  const _savePlaylist = async () => {
    setIsSaving(true);
    const playlistId = await savePlaylist(
      playlistNo + 1,
      playlistTitle,
      addedTopics
    );
    setIsSaving(false);
    Router.push(`/playlist/${playlistId}`);
  };

  const addTopic = (topic, noQuestions, isRandom, min, max) => {
    const _topic = {
      topic: topic,
      isStarred: false,
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
    <Layout activeIndex={3}>
      <div className="flex items-center">
        <input
          className="text-3xl lg:text-5xl text-text dark:text-darkText rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-b-textGrayed border-b-2 focus:border-b-primary focus:dark:border-b-darkPrimary dark:placeholder:text-textGrayed  transition"
          type="text"
          placeholder={`My Playlist #${playlistNo + 1}`}
          onChange={(e) => setPlaylistTitle(e.target.value)}
        ></input>
        <div className="text-text dark:text-darkText ml-2 lg:ml-4">
          <MdEdit size={30} />
        </div>
        <div
          onClick={async () => await _savePlaylist()}
          className="hidden md:block bg-primary dark:bg-darkPrimary text-white rounded-xl px-4 py-2 font-bold ml-4 text-xl cursor-pointer "
        >
          {isSaving ? <Spinner /> : "Save"}
        </div>
      </div>
      <h3 className="text-textGrayed mt-4">by Leon Rode</h3>
      <div
        onClick={async () => await _savePlaylist()}
        className=" md:hidden bg-primary dark:bg-darkPrimary text-white dark:text-darkText rounded-xl px-4 py-2 font-bold text-xl cursor-pointer mt-4"
      >
        {isSaving ? <Spinner /> : "Save"}
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
      <div className="mt-4"></div>
      <SearchBar
        _onChange={(prompt) => setInputPrompt(prompt)}
        isSearching={resultsLoading}
      />
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
            key={result.title}
            addHandler={addTopic}
          />
        ))}
      </div>
    </Layout>
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

export default Create;
