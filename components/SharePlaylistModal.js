import { MdOutlineIosShare, MdClear } from "react-icons/md";
import { useState, useRef } from "react";
import useOutsideClick from "../lib/useOutsideClick";
function SharePlaylistModal({ _id }) {
  const [show, setShow] = useState(false);

  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => setShow(false));
  return (
    <>
      {show ? (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-opaqueBlack  flex justify-center items-center ">
          <div
            ref={modalRef}
            className="rounded-xl w-3/4  md:w-1/2  bg-lightBg dark:bg-darkBg opacity-100 p-10"
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-text dark:text-darkText font-bold text-2xl">
                Share this playlist
              </h1>
              <MdClear
                className="cursor-pointer text-text dark:text-darkText"
                size={30}
                onClick={() => setShow(false)}
              />
            </div>
            <div className=" my-8" />
            <div className="flex items-center">
              <h3 className="underline underline-offset-4">{`https://mazzle.me/playlist/${_id}`}</h3>
              <div className="p-2 rounded-lg cursor-pointer ml-2 bg-primary dark:bg-darkPrimary">
                Copy
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <MdOutlineIosShare
        className="text-text dark:text-darkText ml-2"
        size={25}
        onClick={() => setShow(true)}
      />
    </>
  );
}

export default SharePlaylistModal;
