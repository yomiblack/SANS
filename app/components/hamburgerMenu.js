"use client";
import { useState } from "react";

export default function HamburgerMenu({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-stone-800 text-stone-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? (
          <span>&#x2715; {/* Close Icon */}</span>
        ) : (
          <span>&#9776; {/* Hamburger Icon */}</span>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-stone-50 w-64 px-8 py-6 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-72`}
      >
        {children}
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
