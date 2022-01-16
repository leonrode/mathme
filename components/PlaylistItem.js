import Latex from "react-latex-next";
import Link from "next/link";
import { MdOutlineMoreVert } from "react-icons/md";
function PlaylistItem({ title, example, number, _id }) {
  return (
    <div className="px-4 w-full bg-white dark:bg-darkElevated rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-white dark:border-darkDivider hover:border-primary dark:hover:border-darkPrimary transition">
      <div className="flex w-1/2 pr-2">
        <h3 className="text-textGrayed w-3 text-center">{number}</h3>

        <h3 className="text-text dark:text-darkText ml-4 lg:ml-8 truncate">
          {title}
        </h3>
      </div>
      <div className="flex w-1/2 justify-between">
        <div className="text-textGrayed dark:text-darkText">
          <Latex>{`$${example}$`}</Latex>
        </div>
        <div className="flex items-center">
          <Link href={`/practice/${_id}`}>
            <h3 className="text-primary dark:text-darkPrimary font-bold hidden cursor-pointer lg:flex lg:items-center ">
              Practice{" "}
            </h3>
          </Link>
          <MdOutlineMoreVert
            size={20}
            className="lg:ml-4 lg:cursor-pointer text-text dark:text-darkText lg:group-hover:visible lg:invisible hover:bg-divider dark:hover:bg-darkDivider transition rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
