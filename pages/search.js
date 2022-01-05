import Sidebar from "../components/Sidebar";
import SearchResult from "../components/SearchResult";
import Pager from "../components/Pager";
function Search() {
  return (
    <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
      <div className="flex w-5/6 z-0">
        <Sidebar activeIndex={1} />
        <div className="flex flex-col py-24 w-screen items-start px-1/2 lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
          <input
            class="border-2 border-textGrayed bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:border-2 w-full text-black text-lg lg:w-3/4 transition-[border]"
            type="text"
            placeholder="Search for a topic"
          />
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
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
          </div>
          <Pager />
        </div>
      </div>
    </div>
  );
}

export default Search;
