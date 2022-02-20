import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PlaylistItem from "../../components/PlaylistItem";
import Link from "next/link";

import SharePlaylistModal from "../../components/SharePlaylistModal";
import DeletePlaylistModal from "../../components/DeletePlaylistModal";
import {
  MdAssignment,
  MdAssessment,
  MdStarOutline,
  MdOutlineIosShare,
  MdOutlineFileDownload,
  MdShuffle,
  MdStar,
  MdOutlineEdit,
} from "react-icons/md";

import { savePlaylist, starPlaylist } from "../../_api/api";
function PlaylistPage() {
  const [playlist, setPlaylist] = useState(null);
  const [creator, setCreator] = useState(null);

  const Router = useRouter();
  useEffect(() => {
    (async () => {
      const { playlistSlug } = Router.query;

      const playlistRes = await axios.get(`/api/playlist/${playlistSlug}`);
      const creatorId = playlistRes.data.playlist.creator;
      const creatorRes = await axios.get(`/api/user/${creatorId}`);
      setPlaylist(playlistRes.data.playlist);
      setCreator(creatorRes.data.user);
    })();
  }, []);

  const toggleStar = async (index) => {
    let topic = playlist.topics[index];

    if (topic.isStarred) topic.isStarred = false;
    else topic.isStarred = true;

    const newState = {
      ...playlist,
      topics: [
        ...playlist.topics.slice(0, index),
        topic,
        ...playlist.topics.slice(index + 1),
      ],
    };
    await savePlaylist(newState.slug, newState.title, newState.topics);
    setPlaylist(newState);
  };

  const setTitle = async (newTitle) => {
    await savePlaylist(playlist.slug, newTitle, playlist.topics);
  };

  const countStarredTopics = () => {
    return playlist.topics.filter((topic) => topic.isStarred).length;
  };

  return (
    <Layout>
      {playlist && creator && (
        <>
          <div className="flex items-center">
            <div
              className="text-warning dark:text-darkWarning cursor-pointer"
              onClick={async () => {
                await starPlaylist(playlist.slug);
                setPlaylist((playlist) => ({
                  ...playlist,
                  isStarred: !playlist.isStarred,
                }));
              }}
            >
              {playlist.isStarred ? (
                <MdStar size={35} />
              ) : (
                <MdStarOutline size={35} />
              )}
            </div>
            <input
              className="ml-2 text-3xl lg:text-5xl text-text dark:text-darkText rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-transparent border-b-2 focus:border-b-primary dark:focus:border-b-darkPrimary transition"
              type="text"
              placeholder="Playlist Name"
              onBlur={async (e) => {
                await setTitle(e.target.value);
              }}
              defaultValue={playlist.title}
            ></input>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center">
              <img
                src={creator.image}
                referrerPolicy="no-referrer"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="font-bold ml-2">{creator.name}</span>
            </div>
            <SharePlaylistModal slug={playlist.slug} />

            <MdOutlineEdit
              className="cursor-pointer text-text dark:text-darkText ml-4"
              size={25}
              onClick={() =>
                Router.push(`/create?playlistSlug=${playlist.slug}`)
              }
            />
            <DeletePlaylistModal playlistSlug={playlist.slug} />
          </div>
          <h6 className="text-textGrayed text-sm font-bold mt-4">STUDY</h6>
          <div className="flex items-center mt-2">
            <MdAssignment
              className="text-primary dark:text-darkPrimary"
              size={30}
            />
            <Link href={`/practice/playlist/${playlist.slug}`}>
              <span className="font-bold ml-2 cursor-pointer">
                Practice All
              </span>
            </Link>
          </div>
          <div className="flex items-center mt-2">
            <MdShuffle
              className="text-primary dark:text-darkPrimary"
              size={30}
            />
            <Link href={`/practice/playlist/${playlist.slug}?shuffle=true`}>
              <span className="font-bold ml-2 cursor-pointer">Mix Up</span>
            </Link>
          </div>
          <div className="flex items-center mt-2">
            <MdStar className="text-warning dark:text-darkWarning" size={30} />
            <Link href={`/practice/playlist/${playlist.slug}?starred=true`}>
              <span
                className={`${
                  countStarredTopics() === 0 ? "text-textGrayed" : ""
                } font-bold ml-2 cursor-pointer`}
              >
                Study starred topics
              </span>
            </Link>
          </div>
          <div className="flex items-center mt-4">
            <h3 className="text-textGrayed text-sm font-bold">
              {playlist.topics.length} TOPIC
              {playlist.topics.length === 1 ? "" : "S"}
            </h3>

            <h4 className="text-warning dark:text-darkWarning ml-2 flex items-center">
              {countStarredTopics()}{" "}
              <MdStar
                className="text-warning dark:text-darkWarning"
                size={15}
              />
            </h4>
          </div>
          <div className="flex flex-col w-full">
            {playlist.topics.map((topic, i) => (
              <PlaylistItem
                index={i}
                title={topic.topic.title}
                example={topic.topic.example}
                topicId={topic.topic.id}
                starred={topic.isStarred}
                toggleStar={async (index) => await toggleStar(index)}
                key={i}
              />
            ))}
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

export default PlaylistPage;
