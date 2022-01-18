import Layout from "../components/Layout";

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
      const res = await axios.get("/api/user/playlists");
      console.log(res.data.playlists);
      setPlaylists(res.data.playlists);
    })();
  }, []);

  const removePlaylist = async (playlistId) => {
    console.log(playlistId);
    const res = await axios.post("/api/playlist/delete", { playlistId });
    if (res.status === 201) {
      setPlaylists((playlists) =>
        playlists.filter((playlist) => playlist._id !== playlistId)
      );
    }
  };

  return (
    <Layout activeIndex={0}>
      <h1 className="text-text dark:text-darkText text-2xl font-semibold lg:text-4xl">
        Good evening, Leon
      </h1>

      <h3 className="text-textGrayed font-normal text-xl mt-4">
        Your Playlists
      </h3>
      <div className="flex flex-col w-full md:grid md:grid-cols-3 md:grid-rows-auto md:gap-8 md:mt-4">
        {playlists.map((playlist) => (
          <PlaylistCard
            creator={playlist.creator}
            title={playlist.title}
            topics={playlist.topics}
            toDelete={removePlaylist}
            _id={playlist._id}
          />
        ))}

        <AddNewCard />
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
