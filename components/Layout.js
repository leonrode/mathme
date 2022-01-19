import Sidebar from "./Sidebar";

function Layout({ children, activeIndex }) {
  return (
    <div className="flex justify-center w-screen h-screen bg-lightBg dark:bg-darkBg overflow-y-auto ">
      <div className="flex w-full px-4 md:w-5/6 md:px-0 z-0">
        <Sidebar activeIndex={activeIndex} />
        <div className="flex flex-col py-24 w-full items-start  lg:ml-16 lg:overflow-y-auto lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
