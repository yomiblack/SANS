"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const handleBackground = () => {
      if (window.innerWidth <= 640) {
        setBackgroundImage("/sansMobileBackground.png");
      } else {
        setBackgroundImage("/sansBackground.png");
      }
    };

    // Initial check
    handleBackground();

    // Update on resize
    window.addEventListener("resize", handleBackground);

    return () => {
      window.removeEventListener("resize", handleBackground);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center px-4">
        <Link href="/gallery">
          <button className="mt-40 md:mt-60 mb-7 md:mb-10 px-6 py-3 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 rounded-lg shadow-lg transition duration-300">
            Click to Begin
          </button>
        </Link>
      </div>
    </div>
  );
}
