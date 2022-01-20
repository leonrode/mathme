import Layout from "../components/Layout";

import PlaylistCard from "../components/PlaylistCard";
import SkPlaylistCard from "../components/skeletons/SkPlaylistCard";
import AddNewCard from "../components/AddNewCard";
import Spinner from "../components/Spinner";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { getUserPlaylists, deletePlaylist } from "../_api/api";

import { generateTimeOfDay } from "../lib/helpers";

export default function Home() {
  const [playlists, setPlaylists] = useState(null);
  const { data: session } = useSession();

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
        Good {generateTimeOfDay()}, {session.user.name.split(" ")[0]}
      </h1>

      <h3 className="text-textGrayed font-normal text-xl mt-4">
        Your Playlists
      </h3>
      <div className="flex flex-col w-full md:grid md:grid-cols-3 md:grid-rows-auto md:gap-8 md:mt-4">
        {playlists ? (
          playlists.map((playlist) => (
            <PlaylistCard
              creator={playlist.creator}
              title={playlist.title}
              topics={playlist.topics}
              toDelete={_deletePlaylist}
              _id={playlist._id}
              key={playlist._id}
            />
          ))
        ) : (
          <>
            <SkPlaylistCard />
            <SkPlaylistCard />
            <SkPlaylistCard />
            <SkPlaylistCard />
            <SkPlaylistCard />
          </>
        )}
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
