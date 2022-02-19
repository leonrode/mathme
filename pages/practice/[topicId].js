import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";

import Link from "next/link";

import { MdChevronLeft } from "react-icons/md";

import axios from "axios";

import { getSession } from "next-auth/react";
import PracticeManager from "../../components/PracticeManager";

function TopicPage() {
  const router = useRouter();
  const topicId = router.query.topicId;
  const starred = router.query.starred;
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  useEffect(() => {
    const playlistId = router.query.playlistId;

    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();

      if (playlistId) {
        const res = await axios.get(`/api/playlist/${playlistId}`);
        const playlist = res.data.playlist;
        setCurrentPlaylist(playlist);
      }
    })();
  }, []);

  return (
    <Layout activeIndex={-1}>
      <>
        <Link
          href={
            currentPlaylist ? `/playlist/${currentPlaylist.slug}` : "/search"
          }
        >
          <div className="flex items-center cursor-pointer">
            <div className="text-text dark:text-darkText">
              <MdChevronLeft size={35} />
            </div>
            <h3 className="text-text dark:text-darkText text-lg lg:text-xl ">
              {currentPlaylist ? currentPlaylist.title : ""}
            </h3>
          </div>
        </Link>

        {currentPlaylist && (
          <PracticeManager
            topicId={topicId}
            playlist={currentPlaylist}
            starred={!!starred}
          />
        )}
      </>
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

export default TopicPage;
