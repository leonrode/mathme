import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBookmark,
  MdAdd,
  MdMenu,
} from "react-icons/md";

import { useEffect, useRef } from "react";

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

function MobileDropContent({ show, close }) {
  const _ref = useRef(null);

  useOutsideDetection(_ref, close);

  return (
    <div
      className={`${
        show ? " opacity-100" : "opacity-0"
      } top-16 left-0 bg-white border-b-2 border-b-divider w-screen absolute border-t-2 border-t-divider p-4 transition-all`}
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
      <SidebarElement Icon={MdHomeFilled} isActive text="home" />
      <SidebarElement Icon={MdOutlineSearch} text="search" />
      <SidebarElement Icon={MdBookmark} text="saved" />
      <SidebarElement Icon={MdAdd} text="create" />
      <hr className="w-1/2 border-t-divider border-y-1 my-4"></hr>
      <h3 className="text-primary font-semibold ">Upgrade</h3>
      <h3 className="text-text  mt-2">Help</h3>
      <div className="flex items-center justify-between mt-2 w-1/2">
        Dark Mode
        <label
          for="toggle-example"
          class="flex items-center cursor-pointer relative ml-8"
        >
          <input type="checkbox" id="toggle-example" class="sr-only" />
          <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-5 w-9 rounded-full"></div>
        </label>
      </div>
      <h3 className="text-text mt-2">Preferences</h3>
      <hr className="w-1/2 border-t-divider border-y-1 my-4"></hr>
      <h3 className="text-error font-semibold ">Log out</h3>
    </div>
  );
}

function SidebarElement({ Icon, isActive, text }) {
  return (
    <div className="flex items-center mt-2">
      <Icon size={35} color={isActive ? "#2356F7" : "#020d31"} />
      <h3 className="text-text ml-4">{text}</h3>
    </div>
  );
}
export default MobileDropContent;
