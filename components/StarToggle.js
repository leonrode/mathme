import { useState } from "react";

import { MdStar, MdStarOutline } from "react-icons/md";
function StarToggle({ _onChange }) {
  const [isStarred, setIsStarred] = useState(false);
  return (
    <div
      onClick={() => {
        _onChange(!isStarred);
        setIsStarred((prev) => !prev);
      }}
    >
      {isStarred ? (
        <MdStar
          className="hidden md:block cursor-pointer text-warning dark:text-darkWarning ml-3"
          size={25}
        />
      ) : (
        <MdStarOutline
          className="hidden md:block cursor-pointer text-warning dark:text-darkWarning ml-3"
          size={25}
        />
      )}
    </div>
  );
}

export default StarToggle;
