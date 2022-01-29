import { MdAdd } from "react-icons/md";

import { useRef, useEffect } from "react";

function SearchResultOptions({
  show,
  toClose,
  toggleModal,

  _id,
}) {
  const _ref = useRef(null);

  useOutsideDetection(_ref, toClose);
  return (
    <div
      className={`${
        show ? "visible opacity-100" : "invisible opacity-0"
      } bg-white dark:bg-darkDivider rounded-lg absolute p-2 drop-shadow-lg top-0 right-full transition `}
      ref={_ref}
    >
      <div
        onClick={toggleModal}
        className="flex items-center w-full whitespace-nowrap justify-start cursor-pointer hover:bg-gray-700 transition rounded-md p-[1px]"
      >
        <MdAdd className="text-primary dark:text-darkPrimary" size={30} />
        <h3 className="font-bold text-primary dark:text-darkPrimary ml-2">
          Add to Playlist
        </h3>
      </div>
    </div>
  );
}

function useOutsideDetection(ref, onOutsideDetection) {
  useEffect(() => {
    const isOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        return onOutsideDetection();
      }
    };

    document.addEventListener("mousedown", isOutside);

    return () => {
      document.removeEventListener("mousedown", isOutside);
    };
  });
}

export default SearchResultOptions;
