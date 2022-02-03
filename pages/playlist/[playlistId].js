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
  MdOutlineStar,
  MdOutlineIosShare,
  MdOutlineFileDownload,
  MdStar,
  MdOutlineEdit,
} from "react-icons/md";

import { savePlaylist } from "../../_api/api";
function PlaylistPage() {
  const [playlist, setPlaylist] = useState(null);
  const [creator, setCreator] = useState(null);

  const Router = useRouter();
  useEffect(() => {
    (async () => {
      const { playlistId } = Router.query;

      const playlistRes = await axios.get(`/api/playlist/${playlistId}`);
      console.log(playlistRes.data.playlist);
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
    await savePlaylist(newState._id, newState.title, newState.topics);
    setPlaylist(newState);
  };

  const countStarredTopics = () => {
    return playlist.topics.filter((topic) => topic.isStarred).length;
  };

  return (
    <Layout>
      {playlist && creator && (
        <>
          <input
            className="text-3xl lg:text-5xl text-text dark:text-darkText rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-transparent border-b-2 focus:border-b-primary dark:focus:border-b-darkPrimary transition"
            type="text"
            placeholder="Playlist Name"
            defaultValue={playlist.title}
          ></input>
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
            <SharePlaylistModal _id={playlist.slug} />
            <MdOutlineFileDownload
              className="text-text  dark:text-darkText ml-4"
              size={25}
            />
            <MdOutlineEdit
              className="text-text dark:text-darkText ml-4"
              size={25}
              onClick={() => Router.push(`/create?playlistId=${playlist.slug}`)}
            />
            <DeletePlaylistModal playlistId={playlist.slug} />
          </div>
          <h6 className="text-textGrayed font-bold mt-4">Study</h6>
          <div className="flex items-center mt-2">
            <MdAssignment
              className="text-primary dark:text-darkPrimary"
              size={30}
            />
            <Link
              href={`/practice/${playlist.topics[0].topic.id}?playlistId=${
                playlist.slug
              }&index=${0}`}
            >
              <span className="font-bold ml-2 cursor-pointer">
                Practice All
              </span>
            </Link>
          </div>
          <div className="flex items-center mt-4">
            <MdAssessment
              className="text-primary dark:text-darkPrimary"
              size={30}
            />
            <span className="font-bold ml-2">Take a test</span>
          </div>
          <div className="flex items-center mt-4">
            <MdOutlineStar
              className="text-warning dark:text-darkWarning"
              size={30}
            />
            <Link
              href={`/practice/${playlist.topics[0].topic.id}?playlistId=${playlist.slug}&index=0&starred=true`}
            >
              <span
                className={`${
                  countStarredTopics() === 0 ? "text-textGrayed" : ""
                } font-bold ml-2 cursor-pointer`}
              >
                Study starred topics
              </span>
            </Link>
          </div>
          <div className="flex items-centern mt-4">
            <h3 className="text-textGrayed font-bold">
              {playlist.topics.length} topic
              {playlist.topics.length === 1 ? "" : "s"}
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
                _id={topic.topic.id}
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
