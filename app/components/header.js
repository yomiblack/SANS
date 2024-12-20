"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

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
    <div className="flex justify-between items-center  px-5 md:px-10 bg-gray-50 shadow-md sticky top-0 z-50">
      <header>
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
      </header>
      <nav>
        <ul className="flex gap-4 md:gap-8 text-sm md:text-lg">
          <li>{LinkHover("Home", "/")}</li>
          <li>{LinkHover("About us", "/about")}</li>
          <li>{LinkHover("Gallery", "/gallery")}</li>
          <li>{LinkHover("Choirs", "/choirs")}</li>
          <li>{LinkHover("Result", "/result")}</li>
        </ul>
      </nav>
    </div>
  );
}
