import Modal from "./Modal";

import { useState } from "react";
import {
  MdOutlineMoreVert,
  MdClear,
  MdStar,
  MdStarOutline,
} from "react-icons/md";
import { useRouter } from "next/router";

import Spinner from "./Spinner";

import notify from "../lib/notifier";

function PlaylistItemModal({ index, toSave, topic }) {
  const [show, setShow] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [topicState, setTopicState] = useState({ ...topic });

  return (
    <>
      {show && (
        <Modal show={show} toClose={() => setShow(false)}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {topicState.isStarred ? (
                <MdStar
                  onClick={() =>
                    setTopicState((prev) => ({
                      ...prev,
                      isStarred: !prev.isStarred,
                    }))
                  }
                  size={30}
                  className="text-warning dark:text-darkWarning cursor-pointer"
                />
              ) : (
                <MdStarOutline
                  onClick={() =>
                    setTopicState((prev) => ({
                      ...prev,
                      isStarred: !prev.isStarred,
                    }))
                  }
                  size={30}
                  className="text-warning dark:text-darkWarning cursor-pointer"
                />
              )}
              <h1 className="font-normal text-2xl ml-4">
                Edit <span className="font-bold">{topic.topic.title}</span>
              </h1>
            </div>

            <MdClear
              size={35}
              className="cursor-pointer"
              onClick={() => setShow(false)}
            />
          </div>

          <div className="flex items-center mt-4">
            <span className="text-textGrayed mr-4"># questions: </span>
            <input
              className="bg-transparent outline-none transition ml-2 border-none border-b-2 focus:border-b-primary w-12 lg:w-24 "
              placeholder="#"
              type="number"
              min={1}
              defaultValue={topicState.noQuestions}
              disabled={topicState.isRandom}
              onBlur={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  setTopicState({
                    ...topicState,
                    noQuestions: parseInt(e.target.value),
                  });
                } else {
                  e.target.value = topicState.noQuestions
                    ? topicState.noQuestions
                    : "";
                }
              }}
            />
          </div>
          <div className="flex items-center mt-4">
            <span className="text-textGrayed mr-4">random: </span>
            <input
              type="checkbox"
              defaultChecked={topicState.isRandom}
              onChange={(e) => {
                setTopicState({ ...topicState, isRandom: e.target.checked });
              }}
            />
          </div>
          <div
            className={`mt-1 flex-row items-center ${
              topicState.isRandom ? "flex" : "hidden"
            }`}
          >
            <input
              className=" bg-transparent outline-none transition border-none border-b-2 border-b-white focus:border-b-primary w-12 lg:w-24 "
              placeholder="from"
              type="number"
              min={1}
              max={topicState.max}
              defaultValue={topicState.min}
              onBlur={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  if (
                    topicState.max &&
                    parseInt(e.target.value) >= topicState.max
                  ) {
                    e.target.value = topicState.min ? topicState.min : "";
                  } else {
                    setTopicState({
                      ...topicState,
                      min: parseInt(e.target.value),
                    });
                  }
                } else {
                  e.target.value = topicState.min ? topicState.min : "";
                }
              }}
            />

            <div className="ml-2 ">
              <input
                type="number"
                className="ml-2 bg-transparent outline-none transition border-none border-b-2 border-b-white focus:border-b-primary  w-12 lg:w-24  "
                placeholder="to"
                min={topicState.min}
                defaultValue={topicState.max}
                onBlur={(e) => {
                  if (!isNaN(parseInt(e.target.value))) {
                    if (
                      topicState.min &&
                      parseInt(e.target.value) <= topicState.min
                    ) {
                      e.target.value = topicState.max ? topicState.max : "";
                    } else {
                      setTopicState({
                        ...topicState,
                        max: parseInt(e.target.value),
                      });
                    }
                  } else {
                    e.target.value = topicState.max ? topicState.max : "";
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div
              onClick={async () => {
                setIsSaving(true);
                await toSave(topicState, index);
                setIsSaving(false);
                setShow(false);
                notify("Saved changes", "success");
              }}
              className="border-2 border-transparent text-darkText bg-primary dark:bg-darkPrimary py-2 px-4 cursor-pointer mt-8 w-fit rounded-lg"
            >
              {isSaving ? <Spinner /> : "Save"}
            </div>
            <div
              onClick={() => {
                setTopicState({ ...topic });
                setShow(false);
              }}
              className="ml-8 text-darkText bg-transparent border-2 border-primary dark:border-darkPrimary py-2 px-4 cursor-pointer mt-8 w-fit rounded-lg"
            >
              Cancel
            </div>
          </div>
        </Modal>
      )}
      <MdOutlineMoreVert
        size={20}
        className="lg:ml-4 lg:cursor-pointer text-text dark:text-darkText lg:group-hover:visible lg:opacity-0 lg:group-hover:opacity-100 transition  duration-200 lg:invisible"
        onClick={() => setShow(true)}
      />
    </>
  );
}

export default PlaylistItemModal;
