import Latex from "react-latex-next";
import { MdAdd } from "react-icons/md";
function CreateSearchResult({ topic, addHandler }) {
  return (
    <div className=" w-full bg-white dark:bg-darkElevated rounded-xl flex items-center px-2 py-3 md:px-8 mb-4 border-2 border-transparent hover:border-primary dark:hover:border-darkPrimary transition">
      <div className="flex w-1/2">
        <h3 className="text-text dark:text-darkText  truncate">
          {topic.title}
        </h3>
      </div>
      <div className="flex w-1/2 justify-between items-center">
        <div className="text-textGrayed dark:text-darkText hidden lg:block">
          <Latex>{`$${topic.example}$`}</Latex>
        </div>
        <div className="w-16 lg:hidden"></div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => addHandler(topic)}
        >
          <div className="text-primary dark:text-darkPrimary">
            <MdAdd size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSearchResult;
