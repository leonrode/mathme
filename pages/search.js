import Sidebar from "../components/Sidebar";
import SearchResult from "../components/SearchResult";
import Pager from "../components/Pager";
import MiniSpinner from "../components/MiniSpinner";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "../components/Layout";
function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchPrompt, setSearchPrompt] = useState("");
  const [resultsLoading, setResultsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let prompt;
      if (searchPrompt === "") {
        prompt = "all";
      } else {
        prompt = searchPrompt;
      }
      setResultsLoading(true);
      const res = await fetch(`/api/search?prompt=${prompt}`);
      const data = await res.json();
      setResultsLoading(false);

      setSearchResults(data.results);
    })();
  }, [searchPrompt]);

  return (
    <Layout activeIndex={1}>
      <div className="flex w-full items-center mt-4 lg:w-3/4 relative">
        <input
          className="border-2 border-darkText bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:border-2 w-full text-black dark:text-darkText dark:bg-darkElevated text-lg lg:w-full transition-[border]"
          type="text"
          placeholder="Search for a topic"
          onChange={(e) => setSearchPrompt(e.target.value)}
        />
        {resultsLoading && <MiniSpinner />}
      </div>
      <div className="lg:px-4 lg:w-3/4 w-full">
        <h3 className="text-textGrayed mt-4 font-semibold">
          Showing 1-12 of 1234 results
        </h3>
        <div className="flex justify-between w-full px-4 my-4">
          <div className="flex w-1/2">
            <h3 className="text-textGrayed">Topic</h3>
          </div>
          <div className="flex w-1/2 justify-start">
            <h3 className="text-textGrayed">Example</h3>
          </div>
        </div>
        <div>
          {searchResults.map((result, index) => (
            <SearchResult
              title={result.title}
              example={result.example}
              key={result.id}
              _id={result.id}
              number={index + 1}
            />
          ))}
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

export default Search;
