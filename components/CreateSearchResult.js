import Latex from "react-latex-next";
import { MdAdd } from "react-icons/md";
function CreateSearchResult({ topic, addHandler }) {
  return (
    <div className="w-full bg-white rounded-xl flex items-center px-2 py-3 md:px-8 mb-4">
      <div className="flex w-1/2">
        <h3 className="text-text font-bold truncate">{topic.meta.title}</h3>
      </div>
      <div className="flex w-1/2 justify-between items-center">
        <div className="text-textGrayed">
          <Latex>{`$${topic.meta.example}$`}</Latex>
        </div>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => addHandler(topic)}
        >
          <MdAdd color="#2356F7" size={25} />
          <span className="text-primary font-bold hidden md:inline lg:ml-1">
            Add
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateSearchResult;
