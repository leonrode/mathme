import { useState } from "react";

import { MdStar, MdStarOutline } from "react-icons/md";
function StarToggle({ isStarred, index }) {
  console.log("star", index, isStarred);
  return (
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
  );
}

export default StarToggle;
