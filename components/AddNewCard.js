import { MdAdd } from "react-icons/md";

import Link from "next/link";

function AddNewCard() {
  return (
    <Link href="/create">
      <div className="flex flex-col h-32 items-center justify-center bg-white dark:bg-darkElevated rounded-lg p-2 w-32 my-4 md:my-0 border-transparent border-2 hover:border-primary dark:hover:border-darkPrimary transition cursor-pointer">
        <div className="">
          <MdAdd className="text-primary dark:text-darkPrimary" size={50} />
        </div>
        <h3 className="text-primary dark:text-darkPrimary font-bold  text-center">
          Create a playlist
        </h3>
      </div>
    </Link>
  );
}

export default AddNewCard;
