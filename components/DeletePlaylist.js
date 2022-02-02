import Modal from "./Modal";

import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
function DeletePlaylistModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && <Modal show={show} toClose={() => setShow(false)}></Modal>}
      <MdDeleteOutline
        className="text-error dark:text-darkError ml-2"
        size={25}
        onClick={() => setShow(true)}
      />
    </>
  );
}

export default DeletePlaylistModal;
