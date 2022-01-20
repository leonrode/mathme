function SkSearchResult() {
  return (
    <div className="px-4 w-full animate-pulse bg-white dark:bg-darkElevated rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-white dark:border-transparent hover:dark:border-darkPrimary hover:border-primary transition">
      <div className="flex w-1/2 pr-2">
        {/* title */}
        <div className="w-1/2 h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
      </div>
      <div className="flex w-1/2 justify-between">
        <div className="text-textGrayed dark:text-darkText">
          {/* latex */}
          <div className="w-[80px] h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
        </div>
        <div className="flex items-center">
          {/* practice text */}
          <div className="w-[40px] h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
          <div className="text-text dark:text-darkText">
            {/* options */}
            <div className="w-[40px] h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkSearchResult;
