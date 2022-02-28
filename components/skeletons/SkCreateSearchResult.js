import Latex from "react-latex-next";
import { MdAdd } from "react-icons/md";
function SkCreateSearchResult({ topic, addHandler }) {
  return (
    <div className="w-full animate-pulse h-16 bg-white dark:bg-darkElevated rounded-xl flex items-center px-2 py-3 md:px-8 mb-4 border-2 border-transparent hover:border-primary dark:hover:border-darkPrimary transition">
      <div className="flex w-1/2">
        {/* title */}
        <div className="w-1/2 h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
      </div>
      <div className="flex w-1/2 justify-between items-center">
        <div className="text-textGrayed dark:text-darkText">
          {/* latex */}
          <div className="w-[80px] h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
        </div>

        <div className="flex items-center cursor-pointer">
          <div className="text-primary dark:text-darkPrimary">
            {/* options */}
            <div className="w-[40px] h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkCreateSearchResult;
