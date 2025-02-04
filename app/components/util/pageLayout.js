"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../header/header";
import SideBar from "../sidebar/sidebar";
import Footer from "../footer/footer";
import Link from "next/link";

export default function PageLayout({ choirsByTheme, children }) {
  // console.log(choirsByTheme);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile header

  const navArray = [
    { name: "Home", route: "/" },
    { name: "About Us", route: "/about" },
    { name: "Gallery", route: "/gallery" },
    { name: "Choirs", route: "/choirs" },
    { name: "Results", route: "/result" },
  ];

  let activeClass;

  function LinkHover(label, route) {
    activeClass =
      "text-stone-500 hover:text-orange-500 transition-colors duration-300";

    if (pathname.startsWith(route))
      activeClass =
        "text-orange-700 font-semibold hover:text-orange-500 transition-colors duration-300";

    if (route === "/")
      activeClass = "text-stone-500 hover:text-orange-500 hover:shadow-sm";

    return (
      <Link href={route} className={activeClass}>
        {label}
      </Link>
    );
  }

  return (
    <>
      {/* Desktop Header */}
      <Header
        choirsByTheme={choirsByTheme}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} // Pass toggle function to Header
        toggleMenu={() => setIsMenuOpen((prev) => !prev)} // Pass toggle function to Header
        isMenuOpen={isMenuOpen} // Pass state to Header
        navArray={navArray}
        LinkHover={LinkHover}
        activeClass={activeClass}
      >
        <main>{children}</main>
      </Header>

      {/* Header - Slides from the right */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-end"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="w-64 bg-gray-200 shadow-lg p-4"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
            >
              <nav>
                <ul className="flex flex-col gap-4 mt-14 text-center">
                  {navArray.map((nav, index) => (
                    <li
                      key={index}
                      className="whitespace-nowrap"
                      onClick={() => setIsMenuOpen(false)} // Close menu on navigation click
                    >
                      {LinkHover(nav.name, nav.route)}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sidebar */}
      {/* Desktop Sidebar */}
      <div className="flex min-h-screen">
        {!isLandingPage && (
          <div className="hidden md:block w-64 h-screen flex-shrink-0">
            {/* <div className="w-64 bg-gray-800 text-white h-screen flex-shrink-0"> */}

            <SideBar
              choirsByTheme={choirsByTheme}
              toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        )}

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              onClick={() => setIsSidebarOpen(false)}
            >
              <div
                className="w-64 bg-stone-800 shadow-lg p-4"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
              >
                <SideBar
                  choirsByTheme={choirsByTheme}
                  toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                  isSidebarOpen={isSidebarOpen}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 h-screen overflow-auto `}>{children}</main>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
