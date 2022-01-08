import Latex from "react-latex-next";
import { MdRemove } from "react-icons/md";
function AddedTopic({ topic, removeHandler }) {
  return (
    <div className="w-full bg-white rounded-xl flex items-center px-2 py-3 md:px-8 mb-4 animate-fadeIn">
      <div className="flex w-1/2">
        <h3 className="text-text  truncate">{topic.meta.title}</h3>
      </div>
      <div className="flex w-1/2 justify-between items-center">
        <div className="text-textGrayed">
          <Latex>{`$${topic.meta.example}$`}</Latex>
        </div>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => removeHandler(topic)}
        >
          <MdRemove color="#EA1601" size={25} />
          <span className="text-error font-bold hidden md:inline lg:ml-1">
            Remove
          </span>
        </div>
      </div>
    </div>
  );
}

export default AddedTopic;
