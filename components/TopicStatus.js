import { MdCheck, MdClear } from "react-icons/md";

function TopicStatus({ remaining, noCorrect, noIncorrect }) {
  return (
    <>
      {remaining && <h3 className="text-textGrayed">{remaining} remaining</h3>}

      <div className="flex items-center">
        <div className="flex items-center">
          <span className="text-success">{noCorrect}</span>
          <MdCheck className="text-success" size={15} />
        </div>
        <div className="flex items-center ml-2">
          <span className="text-error dark:text-darkError">{noIncorrect}</span>
          <MdClear className="text-error dark:text-darkError" size={15} />
        </div>
      </div>
    </>
  );
}

export default TopicStatus;
