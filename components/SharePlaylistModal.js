import {
  MdOutlineIosShare,
  MdClear,
  MdContentCopy,
  MdCheck,
} from "react-icons/md";
import { useState, useRef } from "react";
import useOutsideClick from "../lib/useOutsideClick";
function SharePlaylistModal({ _id }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => setShow(false));
  return (
    <>
      {show ? (
        <div className="z-50 animate-modalFadeIn fixed top-0 left-0 w-full h-full bg-opaqueBlack  flex justify-center items-center ">
          <div
            ref={modalRef}
            className="animate-slideDown rounded-xl w-5/6  md:w-1/2   bg-lightBg dark:bg-darkBg opacity-100 p-10"
          >
            <div className="flex items-center justify-between ">
              <h1 className="text-text dark:text-darkText font-bold text-2xl">
                Share this playlist
              </h1>
              <MdClear
                className="cursor-pointer text-text dark:text-darkText"
                size={30}
                onClick={() => {
                  setShow(false);
                  setCopied(false);
                }}
              />
            </div>
            <div className=" my-8" />
            <div className="flex items-center">
              <input
                disabled
                defaultValue={`https://mazzle.me/playlist/${_id}`}
                className="overflow-x-auto  bg-transparent text-textGrayed underline underline-offset-4"
              />
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://mazzle.me/playlist/${_id}`
                  );
                  setCopied(true);
                }}
                className="p-2 rounded-lg cursor-pointer ml-4 bg-primary dark:bg-darkPrimary"
              >
                {copied ? <MdCheck size={20} /> : <MdContentCopy size={20} />}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <MdOutlineIosShare
        className="text-text dark:text-darkText ml-4 cursor-pointer"
        size={25}
        onClick={() => setShow(true)}
      />
    </>
  );
}

export default SharePlaylistModal;
