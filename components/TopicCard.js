import { MdChevronRight } from "react-icons/md";

function TopicCard() {
  return (
    <div className="bg-white rounded-lg p-2 w-full my-4 md:my-0">
      <div className="flex justify-between items-center">
        <img
          src="https://via.placeholder.com/25"
          className="rounded-full"
        ></img>
        <h2 className="text-text text-xl ml-2 font-bold">Test 11/12</h2>

        <MdChevronRight size={35} color="#2356F7" />
      </div>
      <hr className="w-full border-divider my-2"></hr>
      <div className="p-2">
        <h3 className="text-text my-1 truncate">
          Solving quadratic asdasdasds
        </h3>
        <h3 className="text-text my-1 truncate">Solving quadratic</h3>
        <h3 className="text-text my-1 truncate">Solving quadratic</h3>
        <h3 className="text-text my-1 truncate">Solving quadratic</h3>
        <h3 className="text-textGrayed my-1">4 more topics</h3>
      </div>
      <hr className="w-full border-divider my-2"></hr>
      <h3 className="text-text text-center text-sm font-semibold">12 topics</h3>
    </div>
  );
}

export default TopicCard;
