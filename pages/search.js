import Sidebar from "../components/Sidebar";
import SearchResult from "../components/SearchResult";
import Pager from "../components/Pager";
import MiniSpinner from "../components/MiniSpinner";
import { useState, useEffect } from "react";

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
    <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
      <div className="flex w-full px-4 md:w-5/6 md:px-0 z-0">
        <Sidebar activeIndex={1} />
        <div className="flex flex-col py-24 w-full items-start lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
          <div className="flex w-full items-center mt-4 lg:w-3/4 relative">
            <input
              class="border-2 border-textGrayed bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:border-2 w-full text-black text-lg lg:w-full transition-[border]"
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
                <h3 className="text-textGrayed w-3">#</h3>
                <h3 className="text-textGrayed ml-4 lg:ml-8">Topic</h3>
              </div>
              <div className="flex w-1/2 justify-start">
                <h3 className="text-textGrayed">Example</h3>
              </div>
            </div>
            <div>
              {searchResults.map((result, index) => (
                <SearchResult
                  title={result.meta.title}
                  example={result.meta.example}
                  key={result.meta.id}
                  _id={result.meta.id}
                  number={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
