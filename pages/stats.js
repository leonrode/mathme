import Layout from "../components/Layout";

import { getSession, useSession } from "next-auth/react";

import { fetchAllStats } from "../_api/api";

import { useState, useEffect } from "react";
function Stats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetchAllStats();
      setStats(res);
    })();
  }, []);
  return (
    <Layout activeIndex={2}>
      <h1 className="text-4xl font-bold text-text dark:text-darkText">
        Your Stats
      </h1>
      <div className="mt-8 h-screen">
        <div className="flex-col md:flex-row flex h-full md:h-1/2">
          <div className="w-full h-full flex flex-col items-center">
            <h3 className="text-textGrayed font-bold">
              YOUR MOST STUDIED TOPIC
            </h3>
            {stats && (
              <>
                <h1 className="text-text dark:text-darkText my-8 font-bold text-3xl text-center">
                  {stats.mostSolvedQuestion.title}
                </h1>

                <span className="text-textGrayed  text-xl mb-2">
                  {stats.mostSolvedQuestion.right +
                    stats.mostSolvedQuestion.wrong}{" "}
                  questions
                </span>
                <span className="text-error dark:text-darkError">
                  {stats.mostSolvedQuestion.wrong} wrong
                </span>
                <span className="text-success">
                  {stats.mostSolvedQuestion.right} right
                </span>
              </>
            )}
          </div>
          <div className="border-2 w-full h-full  border-primary"></div>
        </div>
        <div className="flex-col md:flex-row  flex  h-full md:h-1/2">
          <div className="border-2  w-full h-full border-primary"></div>
          <div className="border-2  w-full h-full border-primary"></div>
        </div>
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

export default Stats;
