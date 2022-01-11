import { MdDeleteOutline } from "react-icons/md";

import { useRef, useEffect } from "react";

import axios from "axios";
function CardOptions({ show, toClose, playlistId, toDelete }) {
  const _ref = useRef(null);

  useOutsideDetection(_ref, toClose);
  return (
    <div
      className={`${
        show ? "visible opacity-100" : "invisible opacity-0"
      } bg-white rounded-lg absolute p-2 drop-shadow-lg top-0 right-full transition `}
      ref={_ref}
    >
      <div
        className="flex items-center w-full justify-between cursor-pointer"
        onClick={async () => await toDelete(playlistId)}
      >
        <MdDeleteOutline className="text-error" size={30} />
        <h3 className="font-bold text-error ml-2">Delete</h3>
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

async function deletePlaylist(playlistId) {
  const res = await axios.post("/api/playlist/delete", { playlistId });
  console.log(res);
}

export default CardOptions;
