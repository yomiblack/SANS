import Link from "next/link";
import SideBar from "../components/sidebar";

export default function Profile() {
  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />

      <div className="w-full md:w-2/3 flex justify-center items-center px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
            No Choir Selected
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-lg">
            Select a choir or get started with a new one
          </p>
          <Link href="/choirs/form">
            <button className="text-base sm:text-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-800 transition-transform transform hover:scale-105 z-30">
              Create new choir
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
