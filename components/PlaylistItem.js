import Latex from "react-latex-next";
import Link from "next/link";
import { MdOutlineMoreVert } from "react-icons/md";
function PlaylistItem({ title, example, number, _id }) {
  return (
    <div className="px-4 w-full bg-white rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-white hover:border-primary transition">
      <div className="flex w-1/2 pr-2">
        <h3 className="text-textGrayed w-3 text-center">{number}</h3>
        <h3 className="text-text ml-4 lg:ml-8 truncate">{title}</h3>
      </div>
      <div className="flex w-1/2 justify-between">
        <div className="text-textGrayed">
          <Latex>{`$${example}$`}</Latex>
        </div>
        <div className="flex items-center">
          <Link href={`/practice/${_id}`}>
            <h3 className="text-primary font-bold hidden cursor-pointer lg:flex lg:items-center ">
              Practice{" "}
            </h3>
          </Link>
          <MdOutlineMoreVert
            color="#000000"
            size={20}
            className="lg:ml-4 lg:cursor-pointer lg:group-hover:visible lg:invisible hover:bg-divider transition rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
