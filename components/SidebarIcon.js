import Link from "next/link";

function SidebarIcon({ Icon, isActive, hoverText, href }) {
  return (
    <Link href={href}>
      <div className="relative group cursor-pointer">
        <div className="flex items-center">
          <div
            className={`${
              isActive
                ? "text-primary dark:text-darkPrimary"
                : "text-text dark:text-darkText"
            }`}
          >
            <Icon size={35} />
          </div>
          <div className="lg:hidden ml-2">{hoverText}</div>
        </div>
        <div className="hidden lg:block absolute top-1/2 left-14 px-3 py-1 rounded drop-shadow-md bg-white dark:bg-darkDoubleElevated text-text dark:text-darkText text-lg -translate-y-1/2  opacity-0  group-hover:opacity-100 transition-all duration-100 ">
          {hoverText}
          <span className="before:rotate-45 before:border-white before:dark:border-darkDoubleElevated before:border-4 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2"></span>
        </div>
      </div>
    </Link>
  );
}

export default SidebarIcon;
