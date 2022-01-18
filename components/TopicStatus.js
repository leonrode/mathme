function TopicStatus({ remaining, correctNumber, incorrectNumber }) {
  return (
    <>
      <h3 className="text-textGrayed">{remaining} remaining</h3>

      <div className="flex items-center">
        <div className="flex items-center">
          <span className="text-success">{correctNumber}</span>
          <MdCheck className="text-success" size={15} />
        </div>
        <div className="flex items-center ml-2">
          <span className="text-error dark:text-darkError">
            {incorrectNumber}
          </span>
          <MdClear className="text-error dark:text-darkError" size={15} />
        </div>
      </div>
    </>
  );
}

export default TopicStatus;
