import Link from "next/link";

export default function Sans3() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2C3178]  to-[#EB1D75] text-stone-50">
      <div className="text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-wider">Save the Date!</h1>

        {/* Subtitle */}
        <p className="text-lg">
          Exciting things are on the horizon! Our next event is coming soon.
          Stay tuned for details.
        </p>

        {/* Event Placeholder Icon */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-pink-500 via-orange-500 to-yellow-400 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12 text-stone-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-3.866 0-7 3.134-7 7m14 0c0-3.866-3.134-7-7-7m0 0V4m0 8h4m-4 0H8m8 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>

        {/* Call to Action */}
        <p className="text-sm text-stone-300">
          Mark your calendar and follow us for updates!
        </p>

        <Link href="https://www.instagram.com/harmonicchoir_/profilecard/?igsh=MTV0NWd4NjhoaGw1Mw==">
          <button className="mt-10 px-6 py-3 bg-orange-500 hover:bg-orange-700 text-white rounded-lg shadow-lg transition duration-300">
            Stay Updated
          </button>
        </Link>
      </div>
    </div>
  );
}
