import { MdClear, MdCheck, MdChevronRight } from "react-icons/md";
import Spinner from "./Spinner";
function CheckAnswerButton({ incorrect, correct, isChecking, verifyHandler }) {
  return (
    <div
      className={`${
        incorrect
          ? "bg-error dark:bg-darkError"
          : correct
          ? "bg-success"
          : "bg-primary dark:bg-darkPrimary"
      } p-2 ml-2 flex flex-col items-center justify-center text-white rounded-lg cursor-pointer transition duration-500`}
      onClick={async () => await verifyHandler()}
    >
      {isChecking ? (
        <Spinner />
      ) : incorrect ? (
        <MdClear className="text-darkText" size={25} />
      ) : correct ? (
        <MdCheck className="text-darkText" size={25} />
      ) : (
        <MdChevronRight className="text-darkText" size={25} />
      )}
    </div>
  );
}

export default CheckAnswerButton;
