import {
  MdHomeFilled,
  MdOutlineSearch,
  MdBookmark,
  MdAdd,
} from "react-icons/md";

function Sidebar() {
  return (
    <aside className="flex flex-col items-center py-16">
      <Logo />
      <Divider />
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center justify-between h-1/3">
          <SidebarIcon Icon={MdHomeFilled} hoverText="home" isActive />
          <SidebarIcon Icon={MdOutlineSearch} hoverText="search" />
          <SidebarIcon Icon={MdBookmark} hoverText="saved" />
          <SidebarIcon Icon={MdAdd} hoverText="create" />
        </div>
        <div className="group relative">
          <img
            src="https://via.placeholder.com/50"
            className="rounded-full"
          ></img>
          <ProfileHoverCard />
        </div>
      </div>
    </aside>
  );
}

function Logo() {
  return <h1 className="text-text text-4xl font-bold ">Math me</h1>;
}

function Divider() {
  return <hr className="w-1/2 border-divider m-4"></hr>;
}

function SidebarIcon({ Icon, isActive, hoverText }) {
  return (
    <div className="relative group cursor-pointer">
      <Icon size={35} color={isActive ? "#2356F7" : "#020d31"} />
      <div className="absolute top-1/2 left-14 px-3 py-1 rounded drop-shadow-md bg-white text-text text-lg -translate-y-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100 ">
        {hoverText}
        <span className="before:rotate-45 before:border-white before:border-4 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2"></span>
      </div>
    </div>
  );
}

function ProfileHoverCard() {
  return (
    <div className="rounded-lg bg-white drop-shadow-md p-4 absolute left-full bottom-1/2 translate-x-2 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-100 ">
      <div className="flex items-center cursor-pointer">
        <img
          src="https://via.placeholder.com/25"
          className="rounded-full"
        ></img>
        <h3 className="text-text ml-4">Leon Rode</h3>
      </div>
      <hr className="w-full border-divider my-2"></hr>
      <h3 className="font-bold text-primary cursor-pointer">Upgrade</h3>
      <h3 className="text-text mt-1 cursor-pointer">Help</h3>
      <div className="flex items-center justify-between mt-1">
        Dark Mode
        <label
          for="toggle-example"
          class="flex items-center cursor-pointer relative ml-8"
        >
          <input type="checkbox" id="toggle-example" class="sr-only" />
          <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-5 w-9 rounded-full"></div>
        </label>
      </div>
      <h3 className="text-text mt-1 cursor-pointer">Preferences</h3>
      <hr className="w-full border-divider my-2"></hr>
      <h3 className="font-bold text-error cursor-pointer">Log out</h3>
    </div>
  );
}
export default Sidebar;
