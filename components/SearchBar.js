import SearchSpinner from "./SearchSpinner";

function SearchBar({ _onChange, isSearching }) {
  return (
    <div className="relative w-full lg:w-3/4">
      <input
        className="border-2 border-text dark:border-darkText dark:bg-darkElevated bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:dark:border-darkPrimary dark:placeholder:text-textGrayed focus:border-2 w-full text-text dark:text-darkText text-lg  transition-[border]"
        type="text"
        placeholder="Search for a topic"
        onChange={(e) => _onChange(e.target.value)}
      />
      {isSearching && <SearchSpinner />}
    </div>
  );
}

export default SearchBar;
