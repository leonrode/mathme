import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBarChart,
  MdAdd,
} from "react-icons/md";

import { useSession } from "next-auth/react";

import SidebarIcon from "./SidebarIcon";

import { signOut } from "next-auth/react";

import { useTheme } from "next-themes";

function Sidebar({ activeIndex }) {
  const { data: session } = useSession();

  return (
    <aside className="top-0 lg:visible lg:flex lg:w-fit lg:h-screen lg:items-center  lg:flex-col lg:justify-between w-1/3 lg:py-16 ">
      <div className="flex flex-col  h-full items-center">
        <Logo />
        <hr className="hidden border-divider dark:border-darkDivider lg:block lg:w-1/2 lg:my-4"></hr>
        <div className="flex flex-col items-center justify-between h-1/3">
          <SidebarIcon
            Icon={MdHomeFilled}
            hoverText="Home"
            href="/home"
            isActive={activeIndex === 0}
          />
          <SidebarIcon
            Icon={MdOutlineSearch}
            hoverText="Search"
            href="/search"
            isActive={activeIndex === 1}
          />
          <SidebarIcon
            Icon={MdBarChart}
            hoverText="Analytics"
            href="/analytics"
            isActive={activeIndex === 2}
          />

          <SidebarIcon
            Icon={MdAdd}
            hoverText="Create"
            href="/create"
            isActive={activeIndex === 3}
          />
        </div>
      </div>

      <div className="group relative">
        <img
          src={session.user.image}
          referrerPolicy="no-referrer"
          width={50}
          height={50}
          className="rounded-full"
        ></img>
        <ProfileHoverCard
          name={session.user.name}
          profileImageUrl={session.user.image}
        />
      </div>
    </aside>
  );
}

function Logo() {
  return (
    <h1 className="text-primary text-3xl font-bold lg:text-4xl dark:text-darkPrimary">
      Mazzle
    </h1>
  );
}

function ProfileHoverCard({ name, profileImageUrl }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="rounded-lg bg-white dark:bg-darkElevated drop-shadow-md p-4 absolute left-full bottom-1/2 translate-x-2 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100 ">
      <div className="flex items-center cursor-pointer">
        <img
          src={profileImageUrl}
          referrerPolicy="no-referrer"
          width={30}
          height={30}
          className="rounded-full"
        ></img>
        <h3 className="text-text dark:text-darkText ml-4">{name}</h3>
      </div>
      <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
      <h3 className="font-bold text-primary dark:text-darkPrimary cursor-pointer">
        Upgrade
      </h3>
      <h3 className="text-text dark:text-darkText mt-1 cursor-pointer">Help</h3>
      <div className="flex items-center text-text dark:text-darkText justify-between mt-1">
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
      <h3 className="text-text dark:text-darkText mt-1 cursor-pointer">
        Preferences
      </h3>
      <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
      <h3
        className="font-bold text-error dark:text-darkError cursor-pointer"
        onClick={() => signOut("google", { callbackUrl: "/login" })}
      >
        Log out
      </h3>
    </div>
  );
}
export default Sidebar;
