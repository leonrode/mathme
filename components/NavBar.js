import { MdMenu } from "react-icons/md";
function NavBar({ toOpen }) {
  return (
    <>
      <nav className="px-4 fixed z-[999] flex items-center justify-between top-0 left-0 w-screen h-16 bg-white dark:bg-darkElevated">
        <MdMenu
          onClick={toOpen}
          size={30}
          className="text-primary dark:text-darkPrimary"
        />
        <h1 className="text-primary text-3xl font-bold lg:text-4xl dark:text-darkPrimary">
          Mazzle
        </h1>
      </nav>
    </>
  );
}

export default NavBar;
