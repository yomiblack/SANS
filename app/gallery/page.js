import Link from "next/link";

export default function Gallery() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-10 mt-20 mb-20">
      {/* SANS 1.0 Card */}
      <Link href="/sans1.0">
        <div className="w-60 h-60 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-3 cursor-pointer">
          <div className="flex justify-center items-center h-full text-white text-2xl font-bold">
            SANS 1.0
          </div>
        </div>
      </Link>

      {/* SANS 2.0 Card */}
      <Link href="/">
        <div className="w-60 h-60 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-3 cursor-pointer">
          <div className="flex justify-center items-center h-full text-white text-2xl font-bold">
            SANS 2.0
          </div>
        </div>
      </Link>

      {/* SANS 3.0 Card */}
      <Link href="/sans3.0">
        <div className="w-60 h-60 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-3 cursor-pointer">
          <div className="flex justify-center items-center h-full text-white text-2xl font-bold">
            SANS 3.0
          </div>
        </div>
      </Link>
    </div>
  );
}
