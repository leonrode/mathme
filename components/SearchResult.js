import { MdOutlineMoreVert } from "react-icons/md";

import { isMobile, isTablet } from "react-device-detect";

import Link from "next/link";

import Latex from "react-latex-next";

function SearchResult({ title, example, number, _id }) {
  const children = (
    <div className="px-4 w-full bg-white rounded-xl h-16 flex justify-between items-center mt-3 group ">
      <div className="flex w-1/2 pr-2">
        <h3 className="text-textGrayed w-3 text-center">{number}</h3>
        <h3 className="text-textGrayed ml-4 lg:ml-8 truncate">{title}</h3>
      </div>
      <div className="flex w-1/2 justify-between">
        <Latex>{`$${example}$`}</Latex>
        <div className="flex items-center">
          <Link href={`http://localhost:3000/practice/${_id}`}>
            <h3 className="text-primary font-bold hidden cursor-pointer lg:flex lg:items-center">
              Practice{" "}
            </h3>
          </Link>
          <MdOutlineMoreVert
            color="#000000"
            size={20}
            className="lg:ml-4 lg:cursor-pointer lg:group-hover:visible lg:invisible"
          />
        </div>
      </div>
    </div>
  );
  return isMobile || isTablet ? (
    <Link href={`http://localhost:3000/practice/${_id}`}>{children}</Link>
  ) : (
    children
  );
}

export default SearchResult;
