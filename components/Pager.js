import { MdChevronRight } from "react-icons/md";

function Pager({ currentPage }) {
  return (
    <div className="flex items-center mt-4">
      <ActivePage pageNumber={1} />
      <InactivePage pageNumber={2} />
      <InactivePage pageNumber={3} />
      <InactivePage pageNumber={4} />
      <MdChevronRight
        color="#000000"
        size={35}
        className="ml-2 cursor-pointer"
      />
    </div>
  );
}

function ActivePage({ pageNumber }) {
  return (
    <div className="bg-primary text-white w-8 h-8 flex justify-center items-center rounded-full">
      {pageNumber}
    </div>
  );
}

function InactivePage({ pageNumber }) {
  return <div className="text-text ml-4 cursor-pointer">{pageNumber}</div>;
}
export default Pager;
