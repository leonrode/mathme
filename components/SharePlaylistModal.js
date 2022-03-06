import {
  MdOutlineIosShare,
  MdClear,
  MdContentCopy,
  MdCheck,
} from "react-icons/md";
import { useState, useRef } from "react";

import Modal from "./Modal";

function SharePlaylistModal({ slug }) {
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
        <div className="my-8" />
        <div className="flex items-center">
          <h3 className="truncate bg-transparent text-textGrayed underline underline-offset-4">{`${window.location.origin}/playlist/${slug}`}</h3>
          <div
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/playlist/${slug}`
              );
              setCopied(true);
            }}
            className={`p-2 rounded-lg cursor-pointer ml-4 ${
              copied ? "bg-success" : "bg-primary dark:bg-darkPrimary"
            } transition text-darkText`}
          >
            {copied ? (
              <span className="flex items-center">
                <MdCheck size={20} />
              </span>
            ) : (
              <span className="flex items-center">
                <MdContentCopy size={20} />
              </span>
            )}
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
