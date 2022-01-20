import StarToggle from "./StarToggle";
import Latex from "react-latex-next";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClear,
  MdStar,
  MdStarOutline,
} from "react-icons/md";

import NumericInput from "react-numeric-input";
import { useState, useEffect } from "react";
function DesktopAddedTopic({
  index,
  topic,
  isLast,

  DEFAULT_NO_QUESTIONS,
  removeHandler,
  moveDownHandler,
  moveUpHandler,
  toggleStar,
  changeHandler,
  isStarred,
  objectConstructor,
}) {
  const [isRandom, setIsRandom] = useState(false);
  const [noQuestions, setNoQuestions] = useState(DEFAULT_NO_QUESTIONS);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);

  useEffect(() => {
    changeHandler(
      index,
      objectConstructor(topic, isRandom, noQuestions, min, max, isStarred)
    );
  }, [isRandom, noQuestions, min, max]);

  return (
    <div className="w-full bg-white dark:bg-darkElevated rounded-xl px-4 py-3 mb-4 border-transparent transition border-2 hover:border-primary hover:dark:border-darkPrimary">
      <div className="w-full flex justify-between ">
        <div className="flex items-center">
          <h3 className="text-grayed ">{index + 1}</h3>
          <span className="h-6 border-x-[1px] border-x-divider dark:border-x-darkDivider ml-4"></span>
          <div className="mx-2" onClick={() => toggleStar(index)}>
            <div>
              {isStarred ? (
                <MdStar
                  className="cursor-pointer text-warning dark:text-darkWarning"
                  size={25}
                />
              ) : (
                <MdStarOutline
                  className=" cursor-pointer text-warning dark:text-darkWarning"
                  size={25}
                />
              )}
            </div>
          </div>
          {/* <div onClick={() => toggleStar(index)}>{isStarred.toString()}</div> */}
          <h3 className="text-text dark:text-darkText truncate font-bold ">
            {topic.title}
          </h3>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-textGrayed dark:text-darkText justify-center min-w-fit  mt-0 ml-4">
            <Latex>{`$${topic.example}$`}</Latex>
          </div>
        </div>
        <div className="flex items-center flex-row">
          <div className="flex items-center flex-row">
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
      <div className="w-full flex flex-row items-center">
        <div className="flex items-center">
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
        </div>
        <div className="flex items-center">
          <h5 className="text-text dark:text-darkText  ml-4 mr-2">random</h5>
          <input
            type="checkbox"
            defaultChecked={isRandom}
            onChange={(e) => {
              setIsRandom(e.target.checked);
            }}
          />

          <div
            className={`flex-row items-center ${isRandom ? "flex" : "hidden"}`}
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
            <div className="ml-2 ">
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
    </div>
  );
}

export default DesktopAddedTopic;
