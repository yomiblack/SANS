"use client";
import { useState } from "react";
import Link from "next/link";
import SidebarDropdown from "./sidebarDropdown";
import Portal from "../util/portal";
import SignIn from "../pages/signIn";
import { UseUIStore } from "@/app/store/uiStore";


export default function SideBarContent({
  currentPage,
  toggleSidebar,
  choirsByTheme,
  isSidebarOpen,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const activeClass =
    "bg-gradient-to-r from-red-500 to-orange-400 text-transparent bg-clip-text hover:from-red-600 hover:to-orange-500 hover:shadow-sm disabled:opacity-50";
  const inactiveClass = "text-stone-300 hover:text-orange-300 hover:shadow-sm";

  const openAddChoir = UseUIStore((state) => state.openAddChoir);
  const closeAddChoir = UseUIStore((state) => state.closeAddChoir);
  const isAddChoirOpen = UseUIStore((state) => state.isAddChoirOpen);

  const isDisableSignin = UseUIStore((state) => state.isDisableSignin);

  let filteredChoirs = [];
  if (choirsByTheme) {
    filteredChoirs = choirsByTheme.flatMap(({ theme, data }) =>
      data
        .filter((choir) =>
          choir.choirDetails.choirName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .map((choir) => ({
          ...choir, // Keep all existing choir properties
          theme, // Include the theme
        }))
    );
  }

  // Toggles the dropdown open/close state
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <>
      <div>
        {/* Search input */}
        <div className="mb-4 md:mb-6">
          <input
            type="text"
            placeholder="Search Choirs..."
            className="w-auto md:w-auto p-2 md:p-3 border focus:outline-none focus:ring-2 focus:ring-orange-400 border-orange-500 rounded bg-stone-800 text-stone-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Always display filtered choirs */}
        {searchQuery && (
          <ul className="flex flex-col mt-4 md:mt-6 mb-4 md:mb-6 space-y-3 md:space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-20">
            {filteredChoirs &&
              filteredChoirs.map((choir) => (
                <li key={choir._id}>
                  <Link
                    className={
                      currentPage === `${choir._id}` ? activeClass : inactiveClass
                    }
                    href={`/choirs/${choir._id}?cluster=${choir.theme}`}
                    onClick={() => {
                      if (isSidebarOpen) {
                        toggleSidebar(); // Close the sidebar first
                      }
                    }}
                  >
                    {choir.choirDetails.choirName}
                  </Link>
                </li>
              ))}
          </ul>
        )}
        <button
          disabled={isDisableSignin}
          className={`w-auto md:w-auto p-2 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg mb-4 md:mb-6 
            ${isDisableSignin ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => {
            if (isSidebarOpen) {
              toggleSidebar(); // Close the sidebar first
            }
            openAddChoir();
          }}
        >
          + Add Choir
        </button>
        {/* </Link> */}
        {choirsByTheme.map(({ theme, data }, index) => (
          <SidebarDropdown
            key={theme}
            activeClass={activeClass}
            choirs={data}
            currentPage={currentPage}
            inactiveClass={inactiveClass}
            name={`SANS ${index + 1}.0`}
            toggleSidebar={toggleSidebar}
            cluster={theme}
            isSidebarOpen={isSidebarOpen}
            episode={index + 1}
            openDropdown={openDropdown} // Pass the openDropdown state
            toggleDropdown={toggleDropdown} // Pass the toggleDropdown function
          />
        ))}
      </div>
      {!isAddChoirOpen ? null : (
        <Portal>
          <SignIn
            closeAddChoir={closeAddChoir}
          />
        </Portal>
      )}
    </>
  );
}
