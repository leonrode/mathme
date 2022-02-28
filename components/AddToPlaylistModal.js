import Modal from "./Modal";

import Spinner from "./Spinner";

import { useState, useEffect } from "react";
import { MdAdd, MdClear } from "react-icons/md";
import { getUserPlaylists, savePlaylist } from "../_api/api";

import { useRouter } from "next/router";
function AddToPlaylistModal({ topic }) {
  const [userPlaylists, setUserPlaylists] = useState(null);

  const [show, setShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (show && !userPlaylists) {
        const playlists = await getUserPlaylists();
        setUserPlaylists(playlists);
      }
    })();
  }, [show]);

  const addTopicToPlaylist = async () => {
    const selectedPlaylist = userPlaylists[selectedIndex];

    setIsSaving(true);

    await savePlaylist(selectedPlaylist.slug, selectedPlaylist.title, [
      ...selectedPlaylist.topics,
      { topic: topic, isStarred: false, isRandom: false, noQuestions: 10 },
    ]);


    setShow(false);
  };

  return (
    <>
      {show && (
        <Modal show={show} toClose={() => setShow(false)}>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold">Add to Playlist</h1>
            <MdClear
              size={35}
              className="cursor-pointer"
              onClick={() => setShow(false)}
            />
          </div>

          {userPlaylists ? (
            <>
              <h1 className="mt-2">{topic.title}</h1>
              <div className="mt-8">
                {userPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.slug}
                    onClick={() => setSelectedIndex(index)}
                    className={`${
                      index !== userPlaylists.length - 1 ? "mb-4" : ""
                    } ${
                      selectedIndex === index
                        ? "border-primary dark:border-darkPrimary"
                        : ""
                    } border-2 border-transparent transition cursor-pointer rounded-lg h-12 flex  justify-between items-center px-4 bg-white dark:bg-darkElevated`}
                  >
                    <h1 className="font-bold">{playlist.title}</h1>
                    <h3 className="text-primary dark:text-darkPrimary">
                      {playlist.topics.length} topic
                      {playlist.topics.length !== 1 ? "s" : ""}
                    </h3>
                  </div>
                ))}
              </div>

              <div
                onClick={addTopicToPlaylist}
                className="bg-primary dark:bg-darkPrimary py-2 px-4 cursor-pointer mt-8 w-fit rounded-lg"
              >
                {isSaving ? (
                  <Spinner />
                ) : (
                  `Add to ${userPlaylists[selectedIndex].title}`
                )}
              </div>
            </>
          ) : (
            <p>Fetching user playlists</p>
          )}
        </Modal>
      )}
      <MdAdd
        className="lg:group-hover:visible lg:invisible text-text dark:text-darkText ml-4 cursor-pointer"
        size={20}
        onClick={() => setShow(true)}
      />
    </>
  );
}

export default AddToPlaylistModal;
