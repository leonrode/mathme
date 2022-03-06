import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import MobileSidebar from "./MobileSidebar";

import { useState } from "react";

function Layout({ children, activeIndex }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex justify-center w-screen h-screen bg-lightBg dark:bg-darkBg overflow-y-auto ">
      <div className="flex  w-full px-4 md:w-5/6 md:px-0 ">
        <div className="hidden lg:block">
          <Sidebar activeIndex={activeIndex} />
        </div>
        <div className="lg:hidden">
          <NavBar
            toOpen={() => setMobileSidebarOpen(true)}
            toClose={() => setMobileSidebarOpen(false)}
          />
        </div>
        <div className="flex overflow-x-hidden w-full">
          <MobileSidebar
            isOpen={mobileSidebarOpen}
            activeIndex={activeIndex}
            toClose={() => setMobileSidebarOpen(false)}
          />
          <div
            className={`flex-1 flex flex-col w-full py-24  lg:ml-16 lg:overflow-y-auto lg:px-8`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
