import { MdOutlineMoreVert } from "react-icons/md";

function SearchResult() {
  return (
    <div className="px-4 w-full bg-white rounded-xl h-16 flex justify-between items-center mt-3 group">
      <div className="flex w-1/2 pr-2">
        <h3 className="text-textGrayed w-3 text-center">1</h3>
        <h3 className="text-textGrayed ml-4 lg:ml-8 truncate">
          Solving quadratics
        </h3>
      </div>
      <div className="flex w-1/2 justify-between">
        <h3 className="text-textGrayed">2x+5</h3>
        <div className="flex items-center">
          <h3 className="text-primary font-bold hidden cursor-pointer lg:flex lg:items-center">
            Practice{" "}
          </h3>
          <MdOutlineMoreVert
            color="#000000"
            size={20}
            className="lg:ml-4 lg:cursor-pointer lg:group-hover:visible lg:invisible"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
