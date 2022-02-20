import Latex from "react-latex-next";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClear,
  MdStar,
  MdStarOutline,
} from "react-icons/md";

import { useState, useEffect } from "react";
function AddedTopic({
  topic,
  changeHandler,
  removeHandler,
  moveUpHandler,
  moveDownHandler,
  toggleStar,
  isStarred,
  isRandom,
  noQuestions,
  min,
  max,
  isLast,
  index,
}) {
  console.log(noQuestions);

  const [_isRandom, setIsRandom] = useState(!!isRandom);
  const [_noQuestions, setNoQuestions] = useState(noQuestions);

  const [_min, setMin] = useState(min ? min : 1);
  const [_max, setMax] = useState(max ? max : 10);

  useEffect(() => {
    changeHandler(
      index,
      constructObject(topic, _isRandom, _noQuestions, _min, _max, isStarred)
    );
  }, [_isRandom, _noQuestions, _min, _max]);
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
          <h3 className="text-text dark:text-darkText truncate font-bold ">
            {topic.title}
          </h3>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-textGrayed dark:text-darkText justify-center min-w-fit hidden lg:block mt-0 ml-4">
            <Latex>{`$${topic.example}$`}</Latex>
          </div>
        </div>
        <div className="flex items-center flex-col lg:flex-row">
          <div className="flex items-center flex-col lg:flex-row">
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
              _isRandom ? "text-textGrayed" : "text-text dark:text-darkText"
            } transition`}
          >
            # questions
          </h5>
          <input
            className="bg-transparent outline-none transition ml-2 border-none border-b-2 focus:border-b-primary w-12 lg:w-24 "
            placeholder="#"
            type="number"
            min={1}
            defaultValue={noQuestions ? noQuestions : 10}
            disabled={_isRandom}
            onChange={(e) => {
              setNoQuestions(parseInt(e.target.value));
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
            defaultChecked={_isRandom}
            onChange={(e) => {
              setIsRandom(e.target.checked);
            }}
          />

          <div
            className={`flex-row items-center ${_isRandom ? "flex" : "hidden"}`}
          >
            <input
              className="bg-transparent outline-none transition ml-2 border-none border-b-2 border-b-white focus:border-b-primary w-12 lg:w-24 "
              placeholder="from"
              type="number"
              min={1}
              defaultValue={_min}
              onChange={(e) => {
                setMin(parseInt(e.target.value));
              }}
              onKeyDown={(e) =>
                e.key === "Backspace" || e.key === "Delete"
                  ? true
                  : !isNaN(Number(e.key))
              }
            />

            <div className="ml-2 ">
              <input
                type="number"
                className="bg-transparent outline-none transition border-none border-b-2 border-b-white focus:border-b-primary  w-12 lg:w-24  "
                placeholder="to"
                min={_min}
                defaultValue={_max}
                onChange={(e) => {
                  setMax(parseInt(e.target.value));
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

const constructObject = (topic, isRandom, noQuestions, min, max, isStarred) => {
  const _obj = { topic: topic, isStarred: isStarred };
  console.log(_obj);
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
