import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBookmark,
  MdAdd,
  MdMenu,
} from "react-icons/md";

import MobileDropContent from "./MobileDropContent";

import { useState, useEffect } from "react";

import Link from "next/link";

function Sidebar({ activeIndex }) {
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      setAvatarUrl(data.results[0].picture.medium);
    })();
  }, []);
  const closeMobileDropdown = () => setShowMobileDropdown(false);

  return (
    <aside className="fixed top-0 w-screen lg:static lg:visible lg:flex lg:justify-end lg:w-fit z-10">
      <div className="fixed top-0 h-16 left-0 w-screen bg-white drop-shadow-md flex items-center justify-between px-4 lg:hidden">
        <Logo />
        <div
          onClick={() => {
            setShowMobileDropdown(true);
          }}
        >
          <MdMenu size={30} color="#000000" />
        </div>
        <div className="absolute left-0 top-0 lg:hidden z-50">
          <MobileDropContent
            show={showMobileDropdown}
            close={closeMobileDropdown}
            activeIndex={activeIndex}
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
              Icon={MdBookmark}
              hoverText="Saved"
              href="/saved"
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
        {avatarUrl && (
          <div className="group relative">
            <img
              src={avatarUrl}
              width={50}
              height={50}
              className="rounded-full"
            ></img>
            <ProfileHoverCard avatarUrl={avatarUrl} />
          </div>
        )}
      </div>
    </aside>
  );
}

function Logo() {
  return (
    <h1 className="text-primary text-3xl font-bold lg:text-4xl ">MathMe</h1>
  );
}

function Divider() {
  return <hr className="hidden lg:block lg:w-1/2 lg:my-4"></hr>;
}

function SidebarIcon({ Icon, isActive, hoverText, href }) {
  return (
    <Link href={href}>
      <div className="relative group cursor-pointer">
        <Icon size={35} color={isActive ? "#2356F7" : "#020d31"} />
        <div className="absolute top-1/2 left-14 px-3 py-1 rounded drop-shadow-md bg-white text-text text-lg -translate-y-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100 ">
          {hoverText}
          <span className="before:rotate-45 before:border-white before:border-4 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2"></span>
        </div>
      </div>
    </Link>
  );
}

function ProfileHoverCard({ avatarUrl }) {
  return (
    <div className="rounded-lg bg-white drop-shadow-md p-4 absolute left-full bottom-1/2 translate-x-2 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100 ">
      <div className="flex items-center cursor-pointer">
        <img
          src={avatarUrl}
          width={30}
          height={30}
          className="rounded-full"
        ></img>
        <h3 className="text-text ml-4">Leon Rode</h3>
      </div>
      <hr className="w-full border-divider my-2"></hr>
      <h3 className="font-bold text-primary cursor-pointer">Upgrade</h3>
      <h3 className="text-text mt-1 cursor-pointer">Help</h3>
      <div className="flex items-center justify-between mt-1">
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
      <h3 className="text-text mt-1 cursor-pointer">Preferences</h3>
      <hr className="w-full border-divider my-2"></hr>
      <h3 className="font-bold text-error cursor-pointer">Log out</h3>
    </div>
  );
}
export default Sidebar;
