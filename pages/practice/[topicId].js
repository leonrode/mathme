import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";

import Link from "next/link";

import {
  MdChevronLeft,
  MdShuffle,
  MdStar,
  MdAssignment,
  MdArrowBack,
} from "react-icons/md";

import { getSession } from "next-auth/react";
import PracticeManager from "../../components/PracticeManager";

function TopicPage() {
  const router = useRouter();
  const topicId = router.query.topicId;

  useEffect(() => {
    (async () => {
      const a = await import("react-mathquill");
      a.addStyles();
    })();
  }, []);
  return (
    <Layout activeIndex={-1}>
      <>
        <Link href="/search">
          <div className="flex items-center cursor-pointer">
            <div className="text-text flex items-center dark:text-darkText">
              <MdArrowBack size={25} />
              <span className="ml-1 ">BACK TO Search</span>
            </div>
          </div>
        </Link>
        <h3 className="text-textGrayed font-bold my-4">
          <div className="flex items-center">
            <MdAssignment className="text-textGrayed mr-2" size={20} />
            PRACTICING
          </div>
        </h3>
        <PracticeManager
          topicId={topicId}
          playlist={null}
          hasPlaylist={false}
          starred={false}
          shuffle={false}
        />
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
