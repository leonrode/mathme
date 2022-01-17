import Latex from "react-latex-next";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClear,
} from "react-icons/md";

import NumericInput from "react-numeric-input";

import { useState, useEffect } from "react";
function AddedTopic({
  topic,
  changeHandler,
  removeHandler,
  moveUpHandler,
  moveDownHandler,
  isLast,
  index,
}) {
  const DEFAULT_NO_QUESTIONS = 10;
  const [isRandom, setIsRandom] = useState(false);
  const [noQuestions, setNoQuestions] = useState(DEFAULT_NO_QUESTIONS);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(max);

  useEffect(() => {
    changeHandler(
      index,
      constructObject(topic, isRandom, noQuestions, min, max)
    );
  }, [isRandom, noQuestions, min, max]);
  return (
    <div className="w-full bg-white dark:bg-darkElevated rounded-xl px-2 py-3 md:px-8 mb-4 border-transparent transition border-2 hover:border-primary hover:dark:border-darkPrimary">
      <div className="w-full flex justify-between ">
        <div className="hidden lg:flex lg:items-center ">
          <h3 className="text-grayed lg:block hidden">{index + 1}</h3>
          <span className="h-6 border-x-[1px] border-x-divider dark:border-x-darkDivider ml-4"></span>

          <h3 className="text-text dark:text-darkText lg:ml-4 truncate font-bold ">
            {topic.title}
          </h3>
        </div>
        <h3 className="lg:hidden truncate font-bold text-text dark:text-darkText">
          {topic.title}
        </h3>

        <div className="text-textGrayed dark:text-darkText justify-center min-w-fit">
          <Latex>{`$${topic.example}$`}</Latex>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <div onClick={() => moveUpHandler(index)}>
              <MdKeyboardArrowUp
                size={30}
                className={`${
                  index === 0
                    ? "text-textGrayed"
                    : "text-text dark:text-darkText cursor-pointer"
                } `}
              />
            </div>
            <div onClick={() => moveDownHandler(index)}>
              <MdKeyboardArrowDown
                size={30}
                className={`${
                  isLast
                    ? "text-textGrayed"
                    : "text-text dark:text-darkText cursor-pointer"
                } `}
              />
            </div>
          </div>
          <div
            className="flex items-center  cursor-pointer "
            onClick={() => removeHandler(index)}
          >
            <MdClear size={25} className=" text-error dark:text-darkError" />
          </div>
        </div>
      </div>
      <div className="my-4 border-[1px] border-divider dark:border-darkDivider w-full"></div>
      <div className="w-full flex items-center">
        <h5
          className={`${
            isRandom ? "text-textGrayed" : "text-text dark:text-darkText"
          } transition`}
        >
          # questions
        </h5>
        <NumericInput
          className="bg-transparent outline-none transition ml-2 border-none border-b-2 focus:border-b-primary w-16 "
          placeholder="#"
          min={1}
          defaultValue={DEFAULT_NO_QUESTIONS}
          disabled={isRandom}
          onChange={(value) => {
            setNoQuestions(value);
          }}
          onKeyDown={(e) =>
            e.key === "Backspace" || e.key === "Delete"
              ? true
              : !isNaN(Number(e.key))
          }
        />
        <h5 className="text-text dark:text-darkText ml-4 mr-2">random</h5>
        <input
          type="checkbox"
          defaultChecked={isRandom}
          onChange={(e) => {
            setIsRandom(e.target.checked);
          }}
        />

        <div
          className={`flex flex-col md:flex-row items-center ${
            isRandom ? "block" : "hidden"
          }`}
        >
          <NumericInput
            className="bg-transparent outline-none transition ml-2 border-none border-b-2 border-b-white focus:border-b-primary w-20 "
            placeholder="from"
            onChange={(value) => {
              setMin(value);
            }}
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
              min={min}
              onChange={(value) => {
                setMax(value);
              }}
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

const constructObject = (topic, isRandom, noQuestions, min, max) => {
  const _obj = { topic: topic };
  if (isRandom) {
    _obj.isRandom = true;
    _obj.min = min;
    _obj.max = max;
  } else {
    _obj.isRandom = false;
    _obj.noQuestions = noQuestions;
  }
  return _obj;
};

export default AddedTopic;
