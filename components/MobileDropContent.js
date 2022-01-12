import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBarChart,
  MdAdd,
  MdMenu,
} from "react-icons/md";

import { useEffect, useRef } from "react";

import Link from "next/link";
import { useTheme } from "next-themes";
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
  }, []);
}

function MobileDropContent({ show, close, activeIndex, profileImageUrl }) {
  const _ref = useRef(null);

  useOutsideDetection(_ref, close);
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`${
        show ? "scale-y-100" : "scale-y-0"
      } mobile-dropdown top-16 left-0 bg-white dark:bg-darkBg border-b-2 border-y-divider dark:border-y-darkDivider  w-screen absolute border-t-2 origin-top  p-4 transition-all z-[999]`}
      ref={_ref}
    >
      <div className="flex items-center ">
        <img
          src={profileImageUrl}
          referrerPolicy="no-referrer"
          className="rounded-full"
          width={40}
          height={40}
        ></img>
        <h3 className="text-text dark:text-darkText font-bold text-xl ml-4">
          Leon Rode
        </h3>
      </div>
      <hr className="w-1/2 border-y-divider dark:border-y-darkDivider border-t-2 mt-4"></hr>
      <SidebarElement
        Icon={MdHomeFilled}
        isActive={activeIndex === 0}
        href="/home"
        text="Home"
      />
      <SidebarElement
        Icon={MdOutlineSearch}
        text="Search"
        href="/search"
        isActive={activeIndex === 1}
      />
      <SidebarElement
        Icon={MdBarChart}
        text="Analytics"
        href="/analytics"
        isActive={activeIndex === 2}
      />
      <SidebarElement
        Icon={MdAdd}
        text="Create"
        isActive={activeIndex === 3}
        href="/create"
      />
      <hr className="w-1/2 border-y-divider dark:border-y-darkDivider border-t-2 my-4"></hr>
      <h3 className="text-primary dark:text-darkPrimary font-bold ">Upgrade</h3>
      <h3 className="text-text dark:text-darkText mt-2">Help</h3>
      <div className="flex items-center justify-between mt-2 w-1/2">
        Dark Mode
        <div>
          <input
            className="toggler relative w-9 ml-4 appearance-none rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300  focus:outline-none cursor-pointer shadow-sm transition-all"
            type="checkbox"
            role="switch"
            defaultChecked={theme === "dark"}
            onClick={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
            }}
          />
        </div>
      </div>
      <h3 className="text-text dark:text-darkText mt-2">Preferences</h3>
      <hr className="w-1/2 border-y-divider dark:border-y-darkDivider border-t-2 my-4"></hr>
      <h3 className="text-error font-semibold ">Log out</h3>
    </div>
  );
}

function SidebarElement({ Icon, isActive, text, href }) {
  return (
    <Link href={href}>
      <div className="flex items-center mt-2">
        <div
          className={`${
            isActive
              ? "text-primary dark:text-darkPrimary"
              : "text-text dark:text-darkText"
          }`}
        >
          <Icon size={35} />
        </div>
        <h3
          className={`${
            isActive
              ? "text-primary dark:text-darkPrimary font-bold"
              : "text-text dark:text-darkText"
          } ml-4`}
        >
          {text}
        </h3>
      </div>
    </Link>
  );
}
export default MobileDropContent;
