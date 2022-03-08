import Modal from "./Modal";

import Spinner from "./Spinner";

import { useState } from "react";
import { MdDeleteOutline, MdClear } from "react-icons/md";
import { deletePlaylist } from "../_api/api";
import { useRouter } from "next/router";

import notify from "../lib/notifier";

function ForbiddenAccessModal({ playlistSlug }) {
  const router = useRouter();

  return (
    <Modal show={true} toClose={() => {}}>
      <div className="flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl">
          Uh oh! You can&apos;t do that!
        </h1>

        <h3 className="text-center text-textGrayed mt-2">
          You can&apos;t edit a playlist you don&apos;t own.
        </h3>

        <h3 className="text-center  font-bold mt-8">
          You can either{" "}
          <span
            onClick={() => router.push("/create")}
            className="text-priamry dark:text-darkPrimary cursor-pointer"
          >
            create one
          </span>{" "}
          or{" "}
          <span
            onClick={() => router.push(`/playlist/${playlistSlug}`)}
            className="text-priamry dark:text-darkPrimary cursor-pointer"
          >
            go to the playlist&apos;s page
          </span>
          .
        </h3>
      </div>
    </Modal>
  );
}

export default ForbiddenAccessModal;
