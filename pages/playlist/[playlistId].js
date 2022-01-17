import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PlaylistItem from "../../components/PlaylistItem";
import Link from "next/link";
import {
  MdAssignment,
  MdAssessment,
  MdOutlineStar,
  MdOutlineIosShare,
  MdOutlineFileDownload,
} from "react-icons/md";

function PlaylistPage() {
  const [playlist, setPlaylist] = useState(null);
  const [creator, setCreator] = useState(null);
  const Router = useRouter();
  useEffect(() => {
    (async () => {
      const { playlistId } = Router.query;
      const playlistRes = await axios.get(`/api/playlist/${playlistId}`);

      const creatorId = playlistRes.data.playlist.creator;
      const creatorRes = await axios.get(`/api/user/${creatorId}`);
      setPlaylist(playlistRes.data.playlist);

      setCreator(creatorRes.data.user);
    })();
  }, []);

  return (
    playlist &&
    creator && (
      <Layout>
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
          <MdOutlineIosShare
            className="text-text dark:text-darkText ml-4"
            size={25}
          />
          <MdOutlineFileDownload
            className="text-text  dark:text-darkText ml-4"
            size={25}
          />
        </div>
        <h6 className="text-textGrayed font-bold mt-4">Study</h6>
        <div className="flex items-center mt-2">
          <MdAssignment
            className="text-primary dark:text-darkPrimary"
            size={30}
          />
          <Link
            href={`/practice/${playlist.topics[0].topic.id}?playlistId=${
              playlist.id
            }&index=${0}`}
          >
            <span className="font-bold ml-2 cursor-pointer">Practice All</span>
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
          <MdOutlineStar className="text-warning" size={30} />
          <span className="font-bold ml-2">Study starred topics</span>
        </div>
        <h3 className="text-textGrayed font-bold mt-4">
          {playlist.topics.length} topic
          {playlist.topics.length === 1 ? "" : "s"}
        </h3>
        <div className="flex flex-col w-full">
          {playlist.topics.map((topic, i) => (
            <PlaylistItem
              index={i}
              title={topic.topic.title}
              example={topic.topic.example}
              _id={topic.topic.id}
              key={i}
            />
          ))}
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

export default PlaylistPage;
