import { MdOutlineMoreVert, MdStar } from "react-icons/md";

import CardOptions from "./CardOptions";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { countStarredTopics } from "../lib/helpers";
function PlaylistCard({ creator, title, topics, _id, toDelete }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/avatar/${creator}`);
      setAvatarUrl(res.data.avatarUrl);
    })();
  }, []);

  const closeDropdown = () => setShowDropdown(false);

  return (
    <div
      onClick={(e) => {
        if (
          !isInSubTree(document.getElementsByClassName("linker")[0], e.target)
        )
          Router.push(`/playlist/${_id}`);
      }}
      className="bg-white dark:bg-darkElevated rounded-lg cursor-pointer p-2 w-full my-4 md:my-0 flex flex-col justify-between border-transparent border-2 hover:border-primary dark:hover:border-darkPrimary transition"
    >
      <div>
        <div className="flex justify-between items-center">
          <img
            src={avatarUrl}
            referrerPolicy="no-referrer"
            className="rounded-full"
            width={30}
            height={30}
          ></img>
          <h2 className="text-text dark:text-darkText text-xl ml-2 font-bold">
            {title}
          </h2>

          <div className="relative linker">
            <div className="text-primary dark:text-darkPrimary">
              <MdOutlineMoreVert
                size={30}
                className="cursor-pointer hover:bg-divider dark:hover:bg-darkDivider transition rounded-sm"
                onClick={() => setShowDropdown(true)}
              />
            </div>

            <CardOptions
              show={showDropdown}
              toClose={closeDropdown}
              playlistId={_id}
              toDelete={() => {
                toDelete(_id);
                setShowDropdown(false);
              }}
              toEdit={() => Router.push(`/create?playlistId=${_id}`)}
            />
          </div>
        </div>
        <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
        <div className="p-2">
          {topics.map((topic, i) => {
            return i < 4 ? (
              <div className="flex items-center">
                {topic.isStarred ? (
                  <MdStar
                    className="text-warning dark:text-darkWarning mr-1"
                    size={15}
                  />
                ) : null}
                <h3 className="text-text dark:text-darkText my-1 truncate">
                  {topic.topic.title}
                </h3>
              </div>
            ) : null;
          })}

          {topics.length > 4 ? (
            <h3 className="text-textGrayed my-4">
              {topics.length - 4} more topic{topics.length - 4 === 1 ? "" : "s"}
            </h3>
          ) : null}
        </div>
      </div>
      <div>
        <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
        <div className="flex items-center justify-center">
          <h3 className="text-text dark:text-darkText text-center text-sm font-semibold">
            {topics.length} topic{topics.length === 1 ? "" : "s"}
          </h3>
          <div className="flex items-center ml-2">
            <h3 className="text-warning dark:text-darkWarning text-center text-sm font-semibold">
              {countStarredTopics(topics)}
            </h3>
            <MdStar size={15} className="text-warning dark:text-darkWarning" />
          </div>
        </div>
      </div>
    </div>
  );
}

function isInSubTree(tree, target) {
  console.log(tree);
  const children = tree.getElementsByTagName("*");
  console.log(children);
  return Array.from(children).includes(target);
}

export default PlaylistCard;
