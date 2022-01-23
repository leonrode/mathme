import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import { MdEdit } from "react-icons/md";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import CreateSearchResult from "../components/CreateSearchResult";
import SkCreateSearchResult from "../components/skeletons/SkCreateSearchResult";
import AddedTopic from "../components/AddedTopic";

import { getSession, useSession } from "next-auth/react";

import {
  searchTopics,
  getPlaylist,
  getUserPlaylists,
  savePlaylist,
  createPlaylist,
} from "../_api/api";
function Create() {
  const [results, setResults] = useState(null);
  const [inputPrompt, setInputPrompt] = useState("");
  const [resultsLoading, setResultsLoading] = useState(true);
  const [addedTopics, setAddedTopics] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [playlistNo, setPlaylistNo] = useState(null);
  const Router = useRouter();

  const { data: session } = useSession();

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
      if (Router.query.playlistId) {
        const playlist = await getPlaylist(Router.query.playlistId);

        const { title, topics } = playlist;
        console.log(title);
        setPlaylistTitle(title);
        setAddedTopics(topics);
      }

      const playlists = await getUserPlaylists();

      setPlaylistNo(playlists.length);
    })();
  }, []);

  const _createPlaylist = async () => {
    setIsSaving(true);

    if (Router.query.playlistId) {
      // if is editing playlist
      await savePlaylist(Router.query.playlistId, playlistTitle, addedTopics);
      setIsSaving(false);
      Router.push(`/playlist/${Router.query.playlistId}`);
    } else {
      const playlistId = await createPlaylist(
        playlistNo + 1,
        playlistTitle,
        addedTopics
      );
      setIsSaving(false);
      Router.push(`/playlist/${playlistId}`);
    }
  };

  const addTopic = (topic, noQuestions, isRandom, min, max) => {
    const _topic = {
      topic: topic,
      isStarred: false,
    };

    console.log(_topic);
    if (isRandom) {
      _topic.isRandom = true;
      _topic.min = min;
      _topic.max = max;
    } else {
      _topic.isRandom = false;
      _topic.noQuestions = noQuestions;
    }
    setAddedTopics((topics) => [...topics, _topic]);
  };

  const changeHandler = (index, newObject) => {
    const newTopics = [
      ...addedTopics.slice(0, index),
      newObject,
      ...addedTopics.slice(index + 1),
    ];
    setAddedTopics(newTopics);
  };

  const removeTopic = (index) => {
    setAddedTopics((topics) => [
      ...topics.slice(0, index),
      ...topics.slice(index + 1),
    ]);
  };

  const toggleTopicStar = (index) => {
    const _topic = { ...addedTopics[index] };
    _topic.isStarred = !_topic.isStarred;

    const newTopics = [
      ...addedTopics.slice(0, index),
      _topic,
      ...addedTopics.slice(index + 1),
    ];
    setAddedTopics(newTopics);
  };

  const moveTopicUp = (index) => {
    if (index !== 0) {
      const original = [...addedTopics];
      const temp = addedTopics[index - 1];
      original[index - 1] = original[index];
      original[index] = temp;

      setAddedTopics(original);
    }
  };
  const moveTopicDown = (index) => {
    if (index !== addedTopics.length - 1) {
      const original = [...addedTopics];
      const temp = addedTopics[index + 1];
      original[index + 1] = original[index];
      original[index] = temp;

      setAddedTopics(original);
    }
  };

  return (
    playlistNo !== null && (
      <Layout activeIndex={3}>
        <div className="flex items-center">
          <input
            className="text-3xl lg:text-5xl text-text dark:text-darkText rounded-none font-bold outline-none bg-transparent w-full lg:w-3/4 border-b-textGrayed border-b-2 focus:border-b-primary focus:dark:border-b-darkPrimary dark:placeholder:text-textGrayed  transition"
            type="text"
            defaultValue={playlistTitle}
            placeholder={`My Playlist #${playlistNo + 1}`}
            onChange={(e) => setPlaylistTitle(e.target.value)}
          ></input>
          <div className="text-text dark:text-darkText ml-2 lg:ml-4">
            <MdEdit size={30} />
          </div>
          <div
            onClick={async () => await _createPlaylist()}
            className="hidden md:block bg-primary dark:bg-darkPrimary text-white rounded-xl px-4 py-2 font-bold ml-4 text-xl cursor-pointer "
          >
            {isSaving ? <Spinner /> : "Save"}
          </div>
        </div>
        <div className="flex items-center mt-4">
          <h3 className="text-textGrayed ">by {session.user.name}</h3>
          <img
            src={session.user.image}
            referrerPolicy="no-referrer"
            className="rounded-full ml-2"
            width={25}
            height={25}
          />
        </div>
        <div
          onClick={async () => await _createPlaylist()}
          className=" md:hidden bg-primary dark:bg-darkPrimary text-white dark:text-darkText rounded-xl px-4 py-2 font-bold text-xl cursor-pointer mt-4"
        >
          {isSaving ? <Spinner /> : "Save"}
        </div>

        <div className="w-full flex flex-col lg:w-11/12 mt-4">
          {addedTopics.map((topic, i) => (
            <AddedTopic
              topic={topic.topic}
              removeHandler={removeTopic}
              changeHandler={changeHandler}
              moveUpHandler={moveTopicUp}
              moveDownHandler={moveTopicDown}
              toggleStar={toggleTopicStar}
              isStarred={topic.isStarred}
              noQuestions={topic.noQuestions}
              isRandom={topic.isRandom}
              min={topic.min}
              max={topic.max}
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
        <div className="flex justify-between w-full lg:w-11/12 px-2 md:px-8 my-4 ">
          <div className="flex w-1/2">
            <h3 className="text-textGrayed ">Topic</h3>
          </div>
          <div className="flex w-1/2 justify-start">
            <h3 className="text-textGrayed">Example</h3>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-11/12 mt-2">
          {results ? (
            results.map((result) => (
              <CreateSearchResult
                topic={result}
                key={result.title}
                addHandler={addTopic}
              />
            ))
          ) : (
            <>
              <SkCreateSearchResult />
              <SkCreateSearchResult />
              <SkCreateSearchResult />
              <SkCreateSearchResult />
            </>
          )}
        </div>
      </Layout>
    )
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
