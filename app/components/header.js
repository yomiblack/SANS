"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu

  function LinkHover(label, route) {
    let activeClass =
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

  if (isLandingPage) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-10 bg-gray-50 shadow-md sticky top-0 z-50">
      {/* Header logo */}
      <header className="w-full flex justify-between items-center">
        <Link href="/">
          <Image
            src="/sansFullLogo.png"
            alt="SANS Full Logo"
            width={150}
            height={75}
            className="object-contain"
            priority
          />
        </Link>
        {/* Hamburger Menu Icon */}
        <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <button className="text-stone-500 p-2">
            <span className="block w-6 h-1 bg-stone-500 mb-2"></span>
            <span className="block w-6 h-1 bg-stone-500 mb-2"></span>
            <span className="block w-6 h-1 bg-stone-500"></span>
          </button>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm md:text-lg mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
          <li className="whitespace-nowrap">{LinkHover("Home", "/")}</li>
          <li className="whitespace-nowrap">
            {LinkHover("About us", "/about")}
          </li>
          <li className="whitespace-nowrap">
            {LinkHover("Gallery", "/gallery")}
          </li>
          <li className="whitespace-nowrap">
            {LinkHover("Choirs", "/choirs")}
          </li>
          <li className="whitespace-nowrap">
            {LinkHover("Result", "/result")}
          </li>
        </ul>
      </nav>
    </div>
  );
}
