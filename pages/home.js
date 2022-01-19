import Layout from "../components/Layout";

import PlaylistCard from "../components/PlaylistCard";
import AddNewCard from "../components/AddNewCard";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { getUserPlaylists, deletePlaylist } from "../api/api";

export default function Home() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      const playlists = await getUserPlaylists();
      setPlaylists(playlists);
    })();
  }, []);

  const _deletePlaylist = async (id) => {
    const successful = await deletePlaylist(id);
    if (successful) {
      setPlaylists((playlists) =>
        playlists.filter((playlist) => playlist._id !== id)
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
            toDelete={_deletePlaylist}
            _id={playlist._id}
            key={playlist._id}
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
