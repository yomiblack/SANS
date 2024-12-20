import Link from "next/link";
import SideBar from "../components/sidebar";

export default function Profile() {
  return (
    <div className="flex">
      <SideBar />

      <div className="w-2/3 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
            No Choir Selected
          </h2>
          <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-lg">
            Select a choir or get started with a new one
          </p>
          <Link href="/choirs/form">
            <button className="text-sm md:text-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-1 md:py-2 px-2 md:px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-800 transition-transform transform hover:scale-105">
              Create new choir
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}