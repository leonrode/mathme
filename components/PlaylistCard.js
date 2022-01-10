import { MdOutlineMoreVert } from "react-icons/md";

import CardOptions from "./CardOptions";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
function PlaylistCard({ creator, title, topics, _id }) {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/avatar/${creator}`);
      setAvatarUrl(res.data.avatarUrl);
    })();
  }, []);

  const closeDropdown = () => setShowDropdown(false);

  return (
    <div className="bg-white rounded-lg p-2 w-full my-4 md:my-0 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <img
            src={avatarUrl}
            referrerPolicy="no-referrer"
            className="rounded-full"
            width={30}
            height={30}
          ></img>
          <h2 className="text-text text-xl ml-2 font-bold">{title}</h2>

          <div className="relative">
            <MdOutlineMoreVert
              size={30}
              color="#2356F7"
              className="cursor-pointer"
              onClick={() => setShowDropdown(true)}
            />
            <CardOptions
              show={showDropdown}
              toClose={closeDropdown}
              playlistId={_id}
            />
          </div>
        </div>
        <hr className="w-full border-divider my-2"></hr>
        <div className="p-2">
          {topics.map((topic, i) =>
            i < 4 ? (
              <h3 className="text-text my-1 truncate">{topic.meta.title}</h3>
            ) : null
          )}

          {topics.length > 4 ? (
            <h3 className="text-textGrayed my-4">
              {topics.length - 4} more topics
            </h3>
          ) : null}
        </div>
      </div>
      <div>
        <hr className="w-full border-divider my-2"></hr>
        <h3 className="text-text text-center text-sm font-semibold">
          {topics.length} topics
        </h3>
      </div>
    </div>
  );
}

export default PlaylistCard;
