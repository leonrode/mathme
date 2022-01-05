import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBookmark,
  MdAdd,
  MdMenu,
} from "react-icons/md";

import { useEffect, useRef } from "react";

import Link from "next/link";

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

function MobileDropContent({ show, close, activeIndex }) {
  const _ref = useRef(null);

  useOutsideDetection(_ref, close);

  return (
    <div
      className={`${
        show ? "scale-y-100" : "scale-y-0"
      } top-16 left-0 bg-white border-b-2 border-b-divider w-screen absolute border-t-2 origin-top border-t-divider p-4 transition-all z-5`}
      ref={_ref}
    >
      <div className="flex items-center ">
        <img
          src="https://via.placeholder.com/35"
          className="rounded-full"
        ></img>
        <h3 className="text-text font-bold text-xl ml-4">Leon Rode</h3>
      </div>
      <hr className="w-1/2 border-t-divider border-y-1 mt-4"></hr>
      <SidebarElement
        Icon={MdHomeFilled}
        isActive={activeIndex === 0}
        href="/home"
        text="home"
      />
      <SidebarElement
        Icon={MdOutlineSearch}
        text="search"
        href="/search"
        isActive={activeIndex === 1}
      />
      <SidebarElement
        Icon={MdBookmark}
        text="saved"
        href="/saved"
        isActive={activeIndex === 2}
      />
      <SidebarElement
        Icon={MdAdd}
        text="create"
        isActive={activeIndex === 3}
        href="/create"
      />
      <hr className="w-1/2 border-t-divider border-y-1 my-4"></hr>
      <h3 className="text-primary font-semibold ">Upgrade</h3>
      <h3 className="text-text  mt-2">Help</h3>
      <div className="flex items-center justify-between mt-2 w-1/2">
        Dark Mode
        <div>
          <input
            className="toggler relative w-9 ml-4 appearance-none rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm transition-all"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked76"
            onClick={(e) => {
              console.log(e.target.checked);
            }}
          />
        </div>
      </div>
      <h3 className="text-text mt-2">Preferences</h3>
      <hr className="w-1/2 border-t-divider border-y-1 my-4"></hr>
      <h3 className="text-error font-semibold ">Log out</h3>
    </div>
  );
}

function SidebarElement({ Icon, isActive, text, href }) {
  return (
    <Link href={href}>
      <div className="flex items-center mt-2">
        <Icon size={35} color={isActive ? "#2356F7" : "#020d31"} />
        <h3 className="text-text ml-4">{text}</h3>
      </div>
    </Link>
  );
}
export default MobileDropContent;
