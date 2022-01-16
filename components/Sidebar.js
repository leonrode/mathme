import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBarChart,
  MdAdd,
  MdMenu,
} from "react-icons/md";

import MobileDropContent from "./MobileDropContent";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { useTheme } from "next-themes";

function Sidebar({ activeIndex }) {
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const { data: session } = useSession();

  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.get(profileImageUrl);
  //     console.log(res);
  //   })();
  // }, []);

  const closeMobileDropdown = () => setShowMobileDropdown(false);

  return (
    <aside className="fixed top-0 w-screen lg:static lg:visible lg:flex lg:justify-end lg:w-fit z-10">
      <div className="fixed top-0 h-16 left-0 w-screen bg-white drop-shadow-md flex items-center justify-between px-4 lg:hidden dark:bg-darkBg">
        <Logo />
        <div
          onClick={() => {
            setShowMobileDropdown(true);
          }}
        >
          <div className="text-text dark:text-darkText">
            <MdMenu size={30} />
          </div>
        </div>
        <div className="absolute left-0 top-0 lg:hidden z-50">
          <MobileDropContent
            show={showMobileDropdown}
            close={closeMobileDropdown}
            activeIndex={activeIndex}
            profileImageUrl={session.user.image}
          />
        </div>
      </div>
      <div className="hidden lg:h-full lg:items-center lg:flex lg:flex-col lg:justify-between w-1/3 lg:py-16">
        <div className="flex flex-col h-2/5 items-center">
          <Logo />
          <Divider />
          <div className="flex flex-col items-center justify-between h-full">
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
          <ProfileHoverCard profileImageUrl={session.user.image} />
        </div>
      </div>
    </aside>
  );
}

function Logo() {
  return (
    <h1 className="text-primary text-3xl font-bold lg:text-4xl dark:text-darkPrimary">
      MathMe
    </h1>
  );
}

function Divider() {
  return (
    <hr className="hidden border-divider dark:border-darkDivider lg:block lg:w-1/2 lg:my-4"></hr>
  );
}

function SidebarIcon({ Icon, isActive, hoverText, href }) {
  return (
    <Link href={href}>
      <div className="relative group cursor-pointer">
        <div
          className={`${
            isActive
              ? "text-primary dark:text-darkPrimary"
              : "text-text dark:text-darkText"
          }`}
        >
          <Icon size={35} />
        </div>
        <div className="absolute top-1/2 left-14 px-3 py-1 rounded drop-shadow-md bg-white dark:bg-darkElevated text-text dark:text-darkText text-lg -translate-y-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100 ">
          {hoverText}
          <span className="before:rotate-45 before:border-white before:dark:border-darkElevated before:border-4 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2"></span>
        </div>
      </div>
    </Link>
  );
}

function ProfileHoverCard({ profileImageUrl }) {
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
        <h3 className="text-text dark:text-darkText ml-4">Leon Rode</h3>
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
