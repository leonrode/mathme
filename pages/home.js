import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex justify-center h-screen w-screen bg-lightBg">
      <div className="flex">
        <Sidebar />
      </div>
    </div>
  );
}
