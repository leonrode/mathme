function SkPlaylistCard() {
  return (
    <div className="bg-white animate-pulse dark:bg-darkElevated rounded-lg cursor-pointer p-2 w-full my-4 md:my-0 flex flex-col justify-between border-transparent border-2 hover:border-primary dark:hover:border-darkPrimary transition">
      <div>
        <div className="flex justify-between items-center">
          {/* profile image */}
          <div className="w-[30px] h-[30px] rounded-full bg-lightSkeleton dark:bg-darkSkeleton" />
          {/* title */}
          <div className="w-3/4 h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
          {/* options div */}
          <div className="w-[30px]" />
        </div>
        <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
        <div className="p-2">
          {/* topics */}
          <div className="w-1/2 h-[10px] bg-lightSkeleton dark:bg-darkSkeleton mb-4" />
          <div className="w-1/2 h-[10px] bg-lightSkeleton dark:bg-darkSkeleton mb-4" />
          <div className="w-1/2 h-[10px] bg-lightSkeleton dark:bg-darkSkeleton mb-4" />
          <div className="w-1/2 h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
        </div>
      </div>
      <div>
        <hr className="w-full border-divider dark:border-darkDivider my-2"></hr>
        <div className="flex items-center justify-center">
          {/* topic count */}
          <div className="w-[80px] h-[10px] bg-lightSkeleton dark:bg-darkSkeleton" />
        </div>
      </div>
    </div>
  );
}

export default SkPlaylistCard;
