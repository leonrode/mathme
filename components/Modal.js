import { useState, useRef } from "react";

import useOutsideClick from "../lib/useOutsideClick";

function Modal({ show, toClose, children }) {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, () => toClose());
  return (
    show && (
      <div className="z-50 animate-modalFadeIn fixed top-0 left-0 w-full h-full bg-opaqueBlack  flex justify-center items-center ">
        <div
          ref={modalRef}
          className="animate-slideDown rounded-xl w-5/6  md:w-1/2   bg-lightBg dark:bg-darkBg opacity-100 p-10"
        >
          {children}
        </div>
      </div>
    )
  );
}

export default Modal;
