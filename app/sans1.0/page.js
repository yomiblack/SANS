import Link from "next/link";

export default function Sans1() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2C3178]  to-[#EB1D75] text-stone-50">
      <div className="text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-wider">
          Content Under Compilation
        </h1>

        {/* Subtitle */}
        <p className="text-lg">
          The event has concluded, but we’re working on curating the highlights
          and moments for you. Check back soon!
        </p>

        {/* Placeholder Icon */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center">
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
              d="M12 8c-3.866 0-7 3.134-7 7m14 0c0-3.866-3.134-7-7-7m0 0V4m0 11a1 1 0 11-2 0 1 1 0 012 0zm0 0a1 1 0 001-1v-2a1 1 0 10-2 0v2a1 1 0 001 1z"
            />
          </svg>
        </div>

        {/* Call to Action */}
        <p className="text-sm text-stone-300">
          Stay connected for updates. In the meantime, explore other sections of
          our site.
        </p>

        <Link href="/gallery">
          <button className="mt-10 px-6 py-3 bg-orange-500 hover:bg-orange-700 text-white rounded-lg shadow-lg transition duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
}
