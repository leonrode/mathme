import { MdOutlineMoreVert, MdArrowForward } from "react-icons/md";

import { isMobile, isTablet } from "react-device-detect";

import Link from "next/link";

import Latex from "react-latex-next";

import SearchResultOptions from "./SearchResultOptions";

import { useState } from "react";
import AddToPlaylistModal from "./AddToPlaylistModal";
function SearchResult({ title, example, number, _id }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const children = (
    <div className="  px-4 w-full bg-white dark:bg-darkElevated rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-white dark:border-transparent hover:dark:border-darkPrimary hover:border-primary transition">
      <div className="flex w-full lg:w-1/2 pr-2">
        <h3 className="text-text dark:text-darkText lg:truncate">{title}</h3>
      </div>

      <div className="flex  lg:w-1/2 justify-end lg:justify-between">
        <div className="text-textGrayed dark:text-darkText hidden lg:block">
          <Latex>{`$${example}$`}</Latex>
        </div>
        <div className="flex items-center">
          <Link href={`/practice/${_id}`}>
            <div className="text-primary dark:text-darkPrimary font-bold hidden cursor-pointer lg:flex lg:items-center ">
              <MdArrowForward size={20} className="ml-2" />
            </div>
          </Link>

          <div className="text-text dark:text-darkText">
            <MdOutlineMoreVert
              size={20}
              className="lg:ml-4 lg:cursor-pointer lg:group-hover:visible lg:invisible hover:bg-divider dark:hover:bg-darkDivider transition rounded-sm"
              onClick={() => {
                setShowDropdown(true);
              }}
            />
          </div>
          <SearchResultOptions
            _id={_id}
            show={showDropdown}
            toggleModal={() => setModalOpen((prev) => !prev)}
            toClose={() => setShowDropdown(false)}
          />
        </div>
      </div>
      {modalOpen ? <AddToPlaylistModal /> : null}
    </div>
  );
  return isMobile || isTablet ? (
    <Link href={`/practice/${_id}`}>{children}</Link>
  ) : (
    children
  );
}

export default SearchResult;
