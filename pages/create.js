import Sidebar from "../components/Sidebar";

import MiniSpinner from "../components/MiniSpinner";

import { MdEdit } from "react-icons/md";

function Create() {
  return (
    <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
      <div className="flex w-5/6 z-0">
        <Sidebar activeIndex={-1} />
        <div className="flex flex-col py-24 w-screen items-start px-1/2 lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
          <div className="flex items-center">
            <input
              className="text-3xl lg:text-5xl text-text rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-b-textGrayed border-b-2 focus:border-b-primary  transition"
              type="text"
              placeholder="My New Playlist #55"
            ></input>
            <MdEdit size={30} color="#000000" className=" ml-2 lg:ml-4" />
          </div>
          <h3 className="text-textGrayed mt-4">by Leon Rode</h3>

          <h3 className="text-text text-lg mt-8">
            Start by searching for some topics
          </h3>
          <h4 className="text-primary font-bold text-base cursor-pointer">
            or view recommended ones
          </h4>
          <div className="flex w-full items-center mt-4 lg:w-1/2 relative">
            <input
              className="border-2 border-textGrayed bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:border-2   w-full text-black text-lg  transition-[border]"
              type="text"
              placeholder="Search for a topic"
            />
            <svg
              className="animate-spin h-6 w-6 text-primary absolute right-0 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-100"
                cx="12"
                cy="12"
                r="10"
                stroke="#CDD1DB"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-100"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col w-full lg:w-1/2 mt-2">
            <div className="w-full h-16 bg-white rounded-xl "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
