import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import { MdEdit, MdArrowForward } from "react-icons/md";

import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/router";

import CreateSearchResult from "../components/CreateSearchResult";
import SkCreateSearchResult from "../components/skeletons/SkCreateSearchResult";
import AddedTopic from "../components/AddedTopic";

import { getSession, useSession } from "next-auth/react";

import notify from "../lib/notifier";

import reducer from "../lib/reducers/create";

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

  const [state, dispatch] = useReducer(reducer, { addedTopics: [] });
  // const addedTopics = state.addedTopics; // TODO: change to state.addedTopcis throughout JSX
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [playlistNo, setPlaylistNo] = useState(null);
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const results = await searchTopics(inputPrompt);
      setResults(results);
    })();
  }, [inputPrompt]);

  useEffect(() => {
    (async () => {
      if (router.query.playlistSlug) {
        const playlist = await getPlaylist(router.query.playlistSlug);

        const { title, topics } = playlist;
        setPlaylistTitle(title);
        dispatch({ type: "set", addedTopics: topics });
        // setAddedTopics(topics);
      }

      const playlists = await getUserPlaylists();

      setPlaylistNo(playlists.length);
    })();
  }, []);

  const _createPlaylist = async () => {
    if (state.addedTopics.length === 0) return;

    setIsSaving(true);
    if (router.query.playlistSlug) {
      // if is editing playlist
      await savePlaylist(
        router.query.playlistSlug,
        playlistTitle,
        state.addedTopics
      );
      setIsSaving(false);
      router
        .push(`/playlist/${router.query.playlistSlug}`)
        .then(() => notify(`Saved ${playlistTitle}`, "success"));
    } else {
      const playlistSlug = await createPlaylist(
        playlistNo + 1,
        playlistTitle,
        state.addedTopics
      );
      setIsSaving(false);
      router.push(`/playlist/${playlistSlug}`).then(() => {
        notify(`Created My Playlist #${playlistNo + 1}`, "success");
      });
    }
  };

  return (
    <Layout activeIndex={3}>
      {playlistNo !== null && (
        <>
          <div className="flex items-center">
            <input
              className="text-3xl lg:text-5xl text-text dark:text-darkText rounded-none font-bold outline-none bg-transparent w-full lg:w-3/4 border-b-textGrayed border-b-2 focus:border-b-primary focus:dark:border-b-darkPrimary dark:placeholder:text-textGrayed  transition"
              type="text"
              defaultValue={playlistTitle}
              placeholder={`My Playlist #${playlistNo + 1}`}
              onChange={(e) => setPlaylistTitle(e.target.value)}
            ></input>
            <div className="hidden lg:block text-text dark:text-darkText ml-2 lg:ml-4">
              <MdEdit size={30} />
            </div>
            <div
              onClick={async () => await _createPlaylist()}
              className="block md:block bg-primary dark:bg-darkPrimary text-white rounded-xl p-2 font-bold ml-4 text-xl cursor-pointer "
            >
              {isSaving ? (
                <Spinner />
              ) : (
                <MdArrowForward className="text-darkText" size={30} />
              )}
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

          <div className="w-full flex flex-col lg:w-11/12 mt-4">
            {state.addedTopics.map((topic, i) => (
              <AddedTopic
                topic={topic.topic}
                removeHandler={() => dispatch({ type: "remove", index: i })}
                changeHandler={(newObject) =>
                  dispatch({ type: "change", index: i, newObject })
                }
                moveUpHandler={() => dispatch({ type: "moveup", index: i })}
                moveDownHandler={() => dispatch({ type: "movedown", index: i })}
                toggleStar={() => dispatch({ type: "star", index: i })}
                isStarred={topic.isStarred}
                noQuestions={topic.noQuestions ? topic.noQuestions : 10}
                isRandom={topic.isRandom}
                min={topic.min}
                max={topic.max}
                index={i}
                isLast={i === state.addedTopics.length - 1}
                key={i}
              />
            ))}
          </div>

          <h3 className="text-text dark:text-darkText text-lg mt-4 md:mt-8">
            Start by searching for some topics
          </h3>
          <div className="mt-4"></div>
          <SearchBar _onChange={(prompt) => setInputPrompt(prompt)} />
          <div className="flex justify-between w-full lg:w-11/12 px-2 md:px-8 my-4 ">
            <div className="flex w-1/2">
              <h3 className="text-textGrayed ">Topic</h3>
            </div>
            <div className="w-1/2 justify-start hidden md:block">
              <h3 className="text-textGrayed">Example</h3>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-11/12 mt-2">
            {results ? (
              results.map((result) => (
                <CreateSearchResult
                  topic={result}
                  key={result.title}
                  addHandler={(topic) =>
                    dispatch({
                      type: "add",
                      topic,
                    })
                  }
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
        </>
      )}
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
