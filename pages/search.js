import SearchResult from "../components/SearchResult";
import SkSearchResult from "../components/skeletons/SkSearchResult";
import SearchBar from "../components/SearchBar";
// import SearchSpinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Layout from "../components/Layout";
import { searchTopics } from "../_api/api.js";
function Search() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchPrompt, setSearchPrompt] = useState("");
  const [resultsLoading, setResultsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setResultsLoading(true);

      const searchResults = await searchTopics(searchPrompt);

      setResultsLoading(false);
      setSearchResults(searchResults);
    })();
  }, [searchPrompt]);

  return (
    <Layout activeIndex={1}>
      <SearchBar
        _onChange={(prompt) => setSearchPrompt(prompt)}
        isSearching={resultsLoading}
      />

      <div className="lg:px-4 lg:w-11/12 mt-8  w-full">
        <h3 className="text-textGrayed font-semibold">
          Showing 1-12 of 1234 results
        </h3>
        <div className="flex justify-between w-full px-4 my-4">
          <div className="flex w-1/2">
            <h3 className="text-textGrayed">Topic</h3>
          </div>
          <div className=" w-1/2 justify-start hidden lg:block">
            <h3 className="text-textGrayed">Example</h3>
          </div>
        </div>
        <div>
          {searchResults ? (
            searchResults.map((result) => (
              <SearchResult topic={result} key={result.id} />
            ))
          ) : (
            <>
              <SkSearchResult />
              <SkSearchResult />
              <SkSearchResult />
              <SkSearchResult />
              <SkSearchResult />
              <SkSearchResult />
              <SkSearchResult />
            </>
          )}
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
