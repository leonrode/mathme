import Latex from "react-latex-next";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClear,
} from "react-icons/md";

import NumericInput from "react-numeric-input";
import StarToggle from "./StarToggle";

import DesktopAddedTopic from "./DesktopAddedTopic";
import MobileAddedTopic from "./MobileAddedTopic";
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
  const DEFAULT_NO_QUESTIONS = 10;
  console.log(isRandom, noQuestions, min, max);
  return (
    <>
      <div className="hidden md:block">
        <DesktopAddedTopic
          index={index}
          topic={topic}
          isLast={isLast}
          DEFAULT_NO_QUESTIONS={DEFAULT_NO_QUESTIONS}
          removeHandler={removeHandler}
          moveDownHandler={moveDownHandler}
          moveUpHandler={moveUpHandler}
          changeHandler={changeHandler}
          toggleStar={toggleStar}
          isStarred={isStarred}
          isRandom={isRandom}
          noQuestions={noQuestions}
          min={min}
          max={max}
          objectConstructor={constructObject}
        />
      </div>
      <div className="md:hidden">
        <MobileAddedTopic
          index={index}
          topic={topic}
          isLast={isLast}
          DEFAULT_NO_QUESTIONS={DEFAULT_NO_QUESTIONS}
          removeHandler={removeHandler}
          moveDownHandler={moveDownHandler}
          moveUpHandler={moveUpHandler}
          changeHandler={changeHandler}
          toggleStar={toggleStar}
          isStarred={isStarred}
          isRandom={isRandom}
          noQuestions={noQuestions}
          min={min}
          max={max}
          objectConstructor={constructObject}
        />
      </div>
    </>
  );
}

const constructObject = (topic, isRandom, noQuestions, min, max, isStarred) => {
  const _obj = { topic: topic, isStarred: isStarred };
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
