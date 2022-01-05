import { MdAdd } from "react-icons/md";

function AddNewCard() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-white rounded-lg p-2 w-full my-4 md:my-0 ">
      <div className="">
        <MdAdd color="#2356F7" size={50} />
      </div>
      <h3 className="text-primary font-bold my-4">Create a playlist</h3>
    </div>
  );
}

export default AddNewCard;
