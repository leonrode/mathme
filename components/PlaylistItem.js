import Latex from "react-latex-next";
import Link from "next/link";
import { MdOutlineMoreVert, MdStar, MdStarOutline } from "react-icons/md";

import { useState } from "react";
function PlaylistItem({ title, example, index, toggleStar, starred, _id }) {
  const [isStarred, setIsStarred] = useState(starred);
  return (
    <div className="px-4 w-full bg-white dark:bg-darkElevated rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-transparent hover:border-primary dark:hover:border-darkPrimary transition">
      <div className="flex items-center w-1/2 pr-2">
        <h3 className="hidden md:block text-textGrayed w-3 text-center">
          {index + 1}
        </h3>
        <div
          className="md:hidden cursor-pointer"
          onClick={() => {
            setIsStarred((prev) => !prev);
            toggleStar(index);
          }}
        >
          {isStarred ? (
            <MdStar className="text-warning dark:text-darkWarning" size={30} />
          ) : (
            <MdStarOutline
              className=" text-warning dark:text-darkWarning"
              size={30}
            />
          )}
        </div>
        <div className="block md:flex md:items-center  ">
          <h3 className="text-text dark:text-darkText ml-4 lg:ml-8 truncate">
            {title}
          </h3>
          <div
            onClick={() => {
              setIsStarred((prev) => !prev);
              toggleStar(index);
            }}
          >
            {isStarred ? (
              <MdStar
                className="hidden md:block cursor-pointer text-warning dark:text-darkWarning ml-3"
                size={25}
              />
            ) : (
              <MdStarOutline
                className="hidden md:block cursor-pointer text-warning dark:text-darkWarning ml-3"
                size={25}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-end md:justify-between">
        <div className="text-textGrayed dark:text-darkText hidden lg:block z-0">
          <Latex>{`$${example}$`}</Latex>
        </div>
        <div className="w-16 hidden md:block"></div>
        <div className="flex items-center">
          <Link href={`/practice/${_id}`}>
            <h3 className="text-primary dark:text-darkPrimary font-bold hidden cursor-pointer lg:flex lg:items-center ">
              Practice{" "}
            </h3>
          </Link>
          <MdOutlineMoreVert
            size={20}
            className="lg:ml-4 lg:cursor-pointer text-text dark:text-darkText lg:group-hover:visible lg:invisible hover:bg-divider dark:hover:bg-darkDivider transition rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
