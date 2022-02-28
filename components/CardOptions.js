import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import { useRef, useEffect } from "react";

import axios from "axios";
function CardOptions({ show, toClose, playlistId, toDelete, toEdit }) {
  const _ref = useRef(null);

  useOutsideDetection(_ref, toClose);
  return (
    <div
      className={`${
        show ? "visible opacity-100" : "invisible opacity-0"
      } bg-white dark:bg-darkDoubleElevated rounded-lg absolute p-2 drop-shadow-lg top-0 right-full transition `}
      ref={_ref}
    >
      <div
        className="flex items-center w-full justify-start cursor-pointer hover:bg-gray-700 transition rounded-md p-[1px]"
        onClick={() => toEdit(playlistId)}
      >
        <MdOutlineEdit className="text-text dark:text-darkText" size={30} />
        <h3 className="font-bold text-text dark:text-darkText ml-2">Edit</h3>
      </div>
      <div
        className="flex items-center w-full justify-start cursor-pointer  mt-2 hover:bg-gray-700 transition rounded-md p-[1px]"
        onClick={async () => await toDelete(playlistId)}
      >
        <MdDeleteOutline className="text-error dark:text-darkError" size={30} />
        <h3 className="font-bold text-error dark:text-darkError ml-2">
          Delete
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

export default CardOptions;
