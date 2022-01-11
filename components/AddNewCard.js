import { MdAdd } from "react-icons/md";

import Link from "next/link";

function AddNewCard() {
  return (
    <Link href="/create">
      <div className="flex flex-col h-32 items-center justify-center bg-white rounded-lg p-2 w-32 my-4 md:my-0 hover:border-2 hover:border-primary transition cursor-pointer">
        <div className="">
          <MdAdd className="text-primary" size={50} />
        </div>
        <h3 className="text-primary font-bold  text-center">
          Create a playlist
        </h3>
      </div>
    </Link>
  );
}

export default AddNewCard;
