"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SidebarMenu from "../sidebar/sidebarMenu";
import SideBar from "../sidebar/sidebar";
import HeaderMenu from "./headerMenu";
import { usePathname } from "next/navigation";

export default function Header({
  choirsByTheme,
  toggleSidebar,
  toggleMenu,
  isMenuOpen,
  navArray,
  LinkHover,
  activeClass,
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const baseClass =
    "flex flex-col md:flex-row justify-between items-center px-5 md:px-10 sticky top-0 z-50";

  const defaultClass = `${baseClass} bg-gray-50 shadow-md`;
  const headerMenuClass = `${baseClass} fixed inset-0 md:inset-full bg-gray-50 shadow-md`;

  if (isLandingPage) return null;

  return (
    <motion.div
      className={isMenuOpen ? headerMenuClass : defaultClass}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{
        y: isMenuOpen ? "0%" : "0%",
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ y: "-100%", opacity: 0 }}
    >
      <header className="w-full flex justify-between items-center">
        {/* Sidebar Menu Icon */}
        <div className="flex justify-start items-center">
          <SidebarMenu toggleSidebar={toggleSidebar} />

          {/* Header logo */}
          <Link href="/">
            <div className="relative w-[120px] h-[80px]">
              <Image
                src="/sansFullLogo.png"
                alt="SANS Full Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        {/* Header Menu Icon */}
        <HeaderMenu toggleMenu={toggleMenu} />
      </header>

      {/* Navigation Menu  */}
      <nav className="hidden md:block">
        <ul className="flex md:flex-row md:gap-8 md:mt-0">
          {navArray.map((nav, index) => (
            <li
              key={index}
              className="whitespace-nowrap"
            // onClick={() => isMenuOpen && setIsMenuOpen((prev) => !prev)}
            // onClick={toggleMenu}
            >
              {LinkHover(nav.name, nav.route)}
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
