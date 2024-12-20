"use client";
import Link from "next/link";
import { useState } from "react";

export default function SideBarContent({ choirs, currentPage }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSans1Open, setSans1Open] = useState(false);
  const [isSans2Open, setSans2Open] = useState(false);

  const activeClass =
    "bg-gradient-to-r from-red-500 to-orange-400 text-transparent bg-clip-text hover:from-red-600 hover:to-orange-500 hover:shadow-sm disabled:opacity-50";
  const inactiveClass = "text-stone-300 hover:text-orange-300 hover:shadow-sm";

  // Filter the choirs based on the search query
  const filteredChoirs = choirs.filter((choir) =>
    choir.choirDetails.choirName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const toggleDropdown = (dropdown) => {
    if (dropdown === "sans1") {
      setSans1Open(!isSans1Open);
    } else if (dropdown === "sans2") {
      setSans2Open(!isSans2Open);
    }
  };

  return (
    <div>
      {/* Search input */}
      <div className="mb-4 md:mb-6">
        <input
          type="text"
          placeholder="Search Choirs..."
          className="w-full p-2 md:p-3 border focus:outline-none focus:ring-2 focus:ring-orange-400 border-orange-500 rounded bg-stone-800 text-stone-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Link href="/choirs/form">{<button>{`+ Add Choir`}</button>}</Link>

      {/* Always display filtered choirs */}
      {searchQuery && (
        <ul className="flex flex-col mt-4 md:mt-6 space-y-3 md:space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-20">
          {filteredChoirs.map((choir) => (
            <li key={choir._id}>
              <Link
                className={
                  currentPage === `${choir._id}` ? activeClass : inactiveClass
                }
                href={`/choirs/${choir._id}`}
              >
                {choir.choirDetails.choirName}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* SANS 1.0 Dropdown */}
      <div className="space-y-2 mt-6">
        <button
          className="w-full flex justify-between items-center px-4 py-2 bg-stone-800 text-stone-50 rounded-lg shadow-md"
          onClick={() => toggleDropdown("sans1")}
        >
          SANS 1.0
          <span>{isSans1Open ? "▲" : "▼"}</span>
        </button>
        {isSans1Open && (
          <ul className="mt-2 space-y-3">
            <li>
              <Link className={inactiveClass} href="">
                Loading...
              </Link>
            </li>
            <li>
              <Link className={inactiveClass} href="">
                Loading...
              </Link>
            </li>
            <li>
              <Link className={inactiveClass} href="">
                Loading...
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* SANS 2.0 Dropdown */}
      <div className="space-y-2 mt-6">
        <button
          className="w-full flex justify-between items-center px-4 py-2 bg-stone-800 text-stone-50 rounded-lg shadow-md"
          onClick={() => toggleDropdown("sans2")}
        >
          SANS 2.0
          <span>{isSans2Open ? "▲" : "▼"}</span>
        </button>
        {isSans2Open && (
          <ul className="mt-2 space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200">
            {choirs.map((choir) => (
              <li key={choir._id}>
                <Link
                  className={
                    currentPage === `${choir._id}` ? activeClass : inactiveClass
                  }
                  href={`/choirs/${choir._id}`}
                >
                  {choir.choirDetails.choirName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
