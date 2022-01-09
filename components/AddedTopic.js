import Latex from "react-latex-next";
import {
  MdDeleteOutline,
  MdSettings,
  MdDragHandle,
  MdDelete,
} from "react-icons/md";
function AddedTopic({ topic, removeHandler, number }) {
  return (
    <div className="w-full bg-white rounded-xl px-2 py-3 md:px-8 mb-4">
      <div className="w-full flex justify-between ">
        <h3 className="text-grayed">{number + 1}</h3>
        <div
          className="flex items-center group cursor-pointer "
          onClick={() => removeHandler(topic)}
        >
          <MdDeleteOutline
            color="#EA1601"
            size={25}
            className="group-hover:hidden "
          />
          <MdDelete
            color="#EA1601"
            size={25}
            className="group-hover:block hidden "
          />
        </div>
      </div>
      <div className="my-2 border-[1px] border-divider w-full"></div>
      <div className="w-full flex items-center ">
        <div className="flex w-1/2">
          <h3 className="text-text truncate">{topic.meta.title}</h3>
        </div>
        <div className="flex w-1/2 justify-between items-center">
          <div className="text-textGrayed">
            <Latex>{`$${topic.meta.example}$`}</Latex>
          </div>
          <div className="flex items-center">
            {/* <MdSettings color="#000000" size={25} /> */}
            <h3 className="text-text font-bold ml-2">Options</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedTopic;
