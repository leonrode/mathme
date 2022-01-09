import Sidebar from "../components/Sidebar";
import TopicCard from "../components/TopicCard";
import AddNewCard from "../components/AddNewCard";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  return (
    <div className="flex justify-center h-screen w-screen bg-lightBg overflow-auto lg:overflow-clip">
      <div className="flex w-5/6">
        <Sidebar activeIndex={0} />
        <div className="flex flex-col py-24 w-screen items-start px-2  lg:w-full lg:ml-16 lg:overflow-y-scroll lg:px-8">
          <h1 className="text-text text-2xl font-semibold lg:text-4xl">
            Good evening, Leon
          </h1>

          <h3 className="text-textGrayed font-normal text-xl mt-4">
            Recently viewed playlists
          </h3>
          <div className="flex flex-col w-full md:grid md:grid-cols-3 md:grid-rows-auto md:gap-8 md:mt-4">
            <TopicCard />
            <TopicCard />
            <TopicCard />
            <TopicCard />
            <TopicCard />
            <AddNewCard />
          </div>

          <h3 className="text-textGrayed font-normal text-xl mt-4 ">
            Playlists like yours
          </h3>
          <div className="flex flex-col w-full md:grid md:grid-cols-3 md:grid-rows-auto md:gap-8 md:mt-4">
            <TopicCard />
            <TopicCard />
            <TopicCard />
          </div>
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
