import Sidebar from "../components/Sidebar";
import PlaylistCard from "../components/PlaylistCard";
import AddNewCard from "../components/AddNewCard";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";
export default function Home() {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/playlist/get");
      setPlaylists(res.data.playlists);
    })();
  }, []);

  return (
    <div className="flex justify-center h-screen w-screen bg-lightBg overflow-auto lg:overflow-clip">
      <div className="flex w-full px-4 md:w-5/6 md:px-0 z-0">
        <Sidebar activeIndex={0} />
        <div className="flex flex-col py-24 w-full items-start lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
          <h1 className="text-text text-2xl font-semibold lg:text-4xl">
            Good evening, Leon
          </h1>

          <h3 className="text-textGrayed font-normal text-xl mt-4">
            Recently viewed playlists
          </h3>
          <div className="flex flex-col w-full md:grid md:grid-cols-3 md:grid-rows-auto md:gap-8 md:mt-4">
            {playlists.map((playlist) => (
              <PlaylistCard
                creator={playlist.creator}
                title={playlist.title}
                topics={playlist.topics}
                _id={playlist.playlistId}
              />
            ))}

            <AddNewCard />
          </div>

          <h3 className="text-textGrayed font-normal text-xl mt-4 ">
            Playlists like yours
          </h3>
          <div className="flex flex-col w-full md:grid md:grid-cols-3 md:grid-rows-auto md:gap-8 md:mt-4"></div>
        </div>
      </div>
    </div>
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
