import Layout from "../components/Layout";

import { getSession, useSession } from "next-auth/react";

import {MdCheck, MdClose} from "react-icons/md"

import { fetchAllStats } from "../_api/api";

import { useState, useEffect } from "react";
function Stats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetchAllStats();
      console.log(res);
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
          <div className="w-full h-full flex flex-col justify-center items-center">
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
                <span className="flex items-center text-error dark:text-darkError">
                  {stats.mostSolvedQuestion.wrong} <MdClose className="text-error dark:text-darkError" size={20} />
                </span>
                <span className="flex items-center text-success">
                  {stats.mostSolvedQuestion.right}  <MdCheck className="text-success" size={20} />
                </span>
              </>
            )}
          </div>
          <div className=" w-full h-full  flex flex-col justify-center items-center">
            <h3 className="text-textGrayed font-bold">ACCURACY PERCENTAGE</h3>
            <h1
              className={`my-4 text-8xl font-bold ${
                stats.correctPercentage.percentage < 0.3
                  ? "text-error dark:text-darkError"
                  : stats.correctPercentage.percentage < 0.7
                  ? "text-warning dark:text-darkWarning"
                  : "text-success"
              }`}
            >
              {~~Math.round(stats.correctPercentage.percentage * 100)}%
            </h1>
            <p className="text-2xl text-textGrayed">{stats.correctPercentage.total} questions</p>
          </div>
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
