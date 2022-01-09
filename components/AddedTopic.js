import Latex from "react-latex-next";
import { MdDelete, MdSettings } from "react-icons/md";
function AddedTopic({ topic, removeHandler }) {
  return (
    <div className="w-full bg-white rounded-xl flex items-center px-2 py-3 md:px-8 mb-4">
      <div className="flex w-1/2">
        <h3 className="text-text  truncate">{topic.meta.title}</h3>
      </div>
      <div className="flex w-1/2 justify-between items-center">
        <div className="text-textGrayed">
          <Latex>{`$${topic.meta.example}$`}</Latex>
        </div>
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => removeHandler(topic)}
          >
            <MdDelete color="#EA1601" size={25} />
          </div>
          <div className="flex items-center cursor-pointer ml-1 md:ml-4">
            <MdSettings color="#020d31" size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedTopic;
