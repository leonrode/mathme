import {
  MdOutlineIosShare,
  MdClear,
  MdContentCopy,
  MdCheck,
} from "react-icons/md";
import { useState, useRef } from "react";

import Modal from "./Modal";

function SharePlaylistModal({ _id }) {
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <>
      <Modal show={show} toClose={() => setShow(false)}>
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
            defaultValue={`${window.location.origin}/playlist/${_id}`}
            className="overflow-x-auto  bg-transparent text-textGrayed underline underline-offset-4"
          />
          <div
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/playlist/${_id}`
              );
              setCopied(true);
            }}
            className="p-2 rounded-lg cursor-pointer ml-4 bg-primary dark:bg-darkPrimary"
          >
            {copied ? <MdCheck size={20} /> : <MdContentCopy size={20} />}
          </div>
        </div>
      </Modal>

      <MdOutlineIosShare
        className="text-text dark:text-darkText ml-4 cursor-pointer"
        size={25}
        onClick={() => {
          setCopied(false);
          setShow(true);
        }}
      />
    </>
  );
}

export default SharePlaylistModal;
