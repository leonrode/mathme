import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";

import Link from "next/link";

import {
  MdChevronLeft,
  MdShuffle,
  MdStar,
  MdAssignment,
  MdArrowBack,
} from "react-icons/md";

import axios from "axios";

import { getSession } from "next-auth/react";
import PracticeManager from "../../../components/PracticeManager";

function PracticePlaylist() {
  const router = useRouter();
  const starred = router.query.starred;
  const shuffle = router.query.shuffle;

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [fetchedPlaylist, setFetchedPlaylist] = useState(false);
  useEffect(() => {
    const playlistSlug = router.query.playlistSlug;

    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();

      if (playlistSlug) {
        const res = await axios.get(`/api/playlist/${playlistSlug}`);
        const playlist = res.data.playlist;
        setCurrentPlaylist(playlist);
      }
      setFetchedPlaylist(true);
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
              <MdArrowBack size={25} />
            </div>
            <h3 className="text-text ml-1 dark:text-darkText">
              {currentPlaylist ? (
                <>
                  BACK TO{" "}
                  <span className="italic">{currentPlaylist.title}</span>
                </>
              ) : (
                ""
              )}
            </h3>
          </div>
        </Link>
        <h3 className="text-textGrayed font-bold my-4">
          {!starred && !shuffle ? (
            <div className="flex items-center">
              <MdAssignment className="text-textGrayed mr-2" size={20} />
              PRACTICING
            </div>
          ) : starred ? (
            <div className="flex items-center">
              <MdStar className="text-textGrayed mr-2" size={20} />
              STARRED ONLY
            </div>
          ) : (
            <div className="flex items-center">
              <MdShuffle className="text-textGrayed mr-2" size={20} />
              MIX UP
            </div>
          )}
        </h3>

        {fetchedPlaylist && (
          <PracticeManager
            topicId={null}
            playlist={currentPlaylist}
            hasPlaylist={currentPlaylist !== null}
            starred={!!starred}
            shuffle={!!shuffle}
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

export default PracticePlaylist;
