import Latex from "react-latex-next";
import {
  MdDeleteOutline,
  MdSettings,
  MdOutlineMoreVert,
  MdDragHandle,
  MdDelete,
} from "react-icons/md";

import NumericInput from "react-numeric-input";

import { useState } from "react";
function AddedTopic({ topic, removeHandler, number }) {
  const [randomChecked, setRandomChecked] = useState(false);
  const [fromNo, setFromNo] = useState(0);
  return (
    <div className="w-full bg-white dark:bg-darkElevated rounded-xl px-2 py-3 md:px-8 mb-4 border-transparent transition border-2 hover:border-primary hover:dark:border-darkPrimary">
      <div className="w-full flex justify-between ">
        <div className="hidden lg:flex lg:items-center ">
          <h3 className="text-grayed lg:block hidden">{number + 1}</h3>
          <span className="h-6 border-x-[1px] border-x-divider dark:border-x-darkDivider ml-4"></span>

          <h3 className="text-text dark:text-darkText lg:ml-4 truncate font-bold ">
            {topic.meta.title}
          </h3>
        </div>
        <h3 className="lg:hidden truncate font-bold text-text dark:text-darkText">
          {topic.meta.title}
        </h3>

        <div className="text-textGrayed dark:text-darkText justify-center min-w-fit">
          <Latex>{`$${topic.meta.example}$`}</Latex>
        </div>
        <div className="flex items-center">
          <div
            className="flex items-center group cursor-pointer "
            onClick={() => removeHandler(topic)}
          >
            <div className="text-error dark:text-darkError">
              <MdDeleteOutline size={25} className="group-hover:hidden " />
            </div>
            <div className="text-error dark:text-darkError">
              <MdDelete size={25} className="group-hover:block hidden " />
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 border-[1px] border-divider dark:border-darkDivider w-full"></div>
      <div className="w-full flex items-center">
        <h5
          className={`${
            randomChecked ? "text-textGrayed" : "text-text dark:text-darkText"
          } transition`}
        >
          # questions
        </h5>
        <NumericInput
          className="bg-transparent outline-none transition ml-2 border-none border-b-2 focus:border-b-primary w-12 "
          placeholder="#"
          disabled={randomChecked}
          onKeyDown={(e) =>
            e.key === "Backspace" || e.key === "Delete"
              ? true
              : !isNaN(Number(e.key))
          }
        />
        <h5 className="text-text dark:text-darkText ml-4 mr-2">random</h5>
        <input
          type="checkbox"
          defaultChecked={randomChecked}
          onChange={(e) => setRandomChecked(e.target.checked)}
        />

        <div
          className={`flex flex-col md:flex-row items-center ${
            randomChecked ? "block" : "hidden"
          }`}
        >
          <NumericInput
            className="bg-transparent outline-none transition ml-2 border-none border-b-2 border-b-white focus:border-b-primary w-20 "
            placeholder="from"
            onChange={(value) => setFromNo(value)}
            onKeyDown={(e) =>
              e.key === "Backspace" || e.key === "Delete"
                ? true
                : !isNaN(Number(e.key))
            }
          />
          <div className="ml-2 mt-4 md:mt-0 md:ml-4 ">
            <NumericInput
              className="bg-transparent outline-none transition border-none border-b-2 border-b-white focus:border-b-primary w-20 "
              placeholder="to"
              min={fromNo}
              onKeyDown={(e) =>
                e.key === "Backspace" || e.key === "Delete"
                  ? true
                  : !isNaN(Number(e.key))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedTopic;
