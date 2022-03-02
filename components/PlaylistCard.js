import { MdStar, MdStarOutline } from "react-icons/md";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { countStarredTopics } from "../lib/helpers";

function PlaylistCard({ playlist, toToggleStar }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const clickableClasses = [`star-${playlist.slug}`];

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/avatar/${playlist.creator}`);
      setAvatarUrl(res.data.avatarUrl);
    })();
  }, []);

  return (
    <div
      onClick={(e) => {
        if (
          clickableClasses
            .map((c) =>
              isInSubTree(document.getElementsByClassName(c)[0], e.target)
            )
            .every((e) => e === false)
        )
          router.push(`/playlist/${playlist.slug}`);
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
          <div className="flex items-center">
            <div className={`star-${playlist.slug} `}>
              <div
                onClick={async () => {
                  await toToggleStar(playlist.slug);
                }}
                className={`text-warning dark:text-darkWarning`}
              >
                {playlist.isStarred ? (
                  <MdStar size={20} />
                ) : (
                  <MdStarOutline size={20} />
                )}
              </div>
            </div>
            <h2 className="text-text dark:text-darkText text-xl ml-2 font-bold">
              {playlist.title}
            </h2>
          </div>

          <div className={`w-[30px]`}></div>
        </div>
        <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
        <div className="p-2">
          {playlist.topics.map((topic, i) => {
            return i < 4 ? (
              <div className="flex items-center" key={i}>
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

          {playlist.topics.length > 4 ? (
            <h3 className="text-textGrayed my-4">
              {playlist.topics.length - 4} more topic
              {playlist.topics.length - 4 === 1 ? "" : "s"}
            </h3>
          ) : null}
        </div>
      </div>
      <div>
        <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
        <div className="flex items-center justify-center">
          <h3 className="text-text dark:text-darkText text-center text-sm font-semibold">
            {playlist.topics.length} topic
            {playlist.topics.length === 1 ? "" : "s"}
          </h3>
          <div className="flex items-center ml-2">
            <h3 className="text-warning dark:text-darkWarning text-center text-sm font-semibold">
              {countStarredTopics(playlist.topics)}
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
