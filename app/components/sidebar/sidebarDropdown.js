"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SidebarDropdown({
  activeClass,
  choirs,
  currentPage,
  inactiveClass,
  name,
  toggleSidebar,
  cluster,
  isSidebarOpen,
  episode,
  openDropdown,
  toggleDropdown,
}) {
  const isOpen = openDropdown === name; // Check if this dropdown is open

  // Slug and Query Parameters
  const queryParams = new URLSearchParams();

  if (cluster) queryParams.append("cluster", cluster);
  if (episode) queryParams.append("episode", episode);

  const queryString = queryParams.toString();

  return (
    <div className="space-y-2 mt-6">
      {/* Dropdown Button */}
      <button
        className="font-display w-full flex justify-between items-center px-4 py-2 bg-stone-800 text-stone-50 rounded-lg shadow-md"
        onClick={() => toggleDropdown(name)}
        aria-expanded={isOpen} // Accessibility improvement
        aria-controls={`${name}-dropdown`} // Accessibility improvement
      >
        {name}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {"▼"}
        </motion.span>
      </button>

      {/* Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={`${name}-dropdown`} // Accessibility improvement
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-2 space-y-3 max-h-[calc(100vh-15rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200"
          >
            {choirs?.map((choir) => (
              <li key={choir._id}>
                <Link
                  className={
                    currentPage === `${choir._id}` ? activeClass : inactiveClass
                  }
                  href={`/choirs/${choir._id}${
                    queryString ? `?${queryString}` : ""
                  }`}
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
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
