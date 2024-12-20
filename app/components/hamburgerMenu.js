"use client";
import { useState } from "react";

export default function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <button className="md:hidden p-3 text-white" onClick={toggleSidebar}>
        {isOpen ? "X" : "☰"} {/* Change icon when open/closed */}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`fixed top-0 left-0 w-3/4 bg-stone-800 text-stone-50 p-4 h-full transition-all ${
            isOpen ? "transform-none" : "transform -translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing the sidebar when clicking inside
        >
          {children}
        </div>
      </div>

      {/* Desktop Sidebar: Always visible on medium and larger screens */}
      <div className="md:block hidden">{children}</div>
    </div>
  );
}
