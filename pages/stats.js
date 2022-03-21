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
      <h1 className="text-4xl font-bold text-text dark:text-darkText">Stats</h1>
      <div className="h-screen">
        <div className="flex-col md:flex-row flex h-full md:h-1/2">
          <div className="border-2 w-full h-full border-primary">
            {stats && <h1>{stats.topQuestion.title}</h1>}
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
