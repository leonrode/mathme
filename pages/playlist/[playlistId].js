import Sidebar from "../../components/Sidebar";

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PlaylistItem from "../../components/PlaylistItem";

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
      <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
        <div className="flex w-full px-4 md:w-5/6 md:px-0 z-0">
          <Sidebar activeIndex={-1} />
          <div className="flex flex-col py-24 w-full items-start  lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
            <input
              className="text-3xl lg:text-5xl text-text rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-b-lightBg border-b-2 focus:border-b-primary  transition"
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
              <MdOutlineIosShare className="text-text ml-4" size={25} />
              <MdOutlineFileDownload className="text-text ml-4" size={25} />
            </div>
            <h6 className="text-textGrayed font-bold mt-4">Study</h6>
            <div className="flex items-center mt-2">
              <MdAssignment className="text-primary" size={30} />
              <span className="font-bold ml-2">Practice All</span>
            </div>
            <div className="flex items-center mt-4">
              <MdAssessment className="text-primary" size={30} />
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
                  number={i + 1}
                  title={topic.meta.title}
                  example={topic.meta.example}
                  _id={topic.meta.id}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
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
