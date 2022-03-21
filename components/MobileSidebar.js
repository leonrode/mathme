import useOutsideClick from "../lib/useOutsideClick";

import { useRef } from "react";

import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBarChart,
  MdAdd,
  MdMenu,
} from "react-icons/md";

import SidebarIcon from "./SidebarIcon";

import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
function MobileSidebar({ isOpen, toClose, activeIndex }) {
  const ref = useRef();

  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  useOutsideClick(ref, toClose);

  return (
    <div
      className={`${
        isOpen ? "mr-4" : "-ml-48"
      }  w-48 lg:hidden flex-shrink-0 py-20 pr-4 transition-all border-r-[2px] border-r-divider dark:border-r-darkDivider `}
      ref={ref}
    >
      <h3 className="text-textGrayed font-bold my-2">ACCOUNT</h3>

      <div className="flex items-center">
        <img
          src={session.user.image}
          referrerPolicy="no-referrer"
          width={30}
          height={30}
          className="rounded-full"
        ></img>
        <h3 className="ml-2 font-bold text-text dark:text-darkText">
          {session.user.name}
        </h3>
      </div>
      <h3 className="text-textGrayed font-bold mt-4 my-2">NAVIGATION</h3>
      <div className="flex flex-col h-1/4 justify-between">
        <SidebarIcon
          Icon={MdHomeFilled}
          hoverText={"Home"}
          href="/home"
          isActive={activeIndex === 0}
        />
        <SidebarIcon
          Icon={MdOutlineSearch}
          hoverText={"Search"}
          href="/search"
          isActive={activeIndex === 1}
        />
        <SidebarIcon
          Icon={MdBarChart}
          hoverText={"Stats"}
          href="/stats"
          isActive={activeIndex === 2}
        />
        <SidebarIcon
          Icon={MdAdd}
          hoverText={"Create"}
          href="/create"
          isActive={activeIndex === 3}
        />
      </div>
      <h3 className="text-textGrayed font-bold mt-4 my-2">MORE</h3>
      <h3 className="font-bold text-primary dark:text-darkPrimary cursor-pointer">
        Upgrade
      </h3>
      <h3 className="text-text dark:text-darkText mt-2 cursor-pointer">Help</h3>
      <div className="flex items-center text-text dark:text-darkText justify-between mt-2">
        Dark Mode
        <div>
          <input
            className="toggler relative w-9 ml-4 appearance-none rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm transition-all"
            type="checkbox"
            role="switch"
            defaultChecked={theme === "dark"}
            onClick={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
              // console.log(e.target.checked);
            }}
          />
        </div>
      </div>
      <h3 className="text-text dark:text-darkText mt-2 cursor-pointer">
        Preferences
      </h3>
      <h3
        className="font-bold text-error mt-4 dark:text-darkError cursor-pointer"
        onClick={() => signOut("google", { callbackUrl: "/login" })}
      >
        Log out
      </h3>
    </div>
  );
}

export default MobileSidebar;
