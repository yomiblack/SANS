"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Input from "../input/input";
import { useState } from "react";

export default function Footer() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubscribing(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `HTTP error! Status: ${response.status}`
        );
      }

      if (result.success) {
        alert("You have successfully subscribed to our newsletter");
        event.target.reset();
      }
    } catch (error) {
      console.error("Error Subscribing:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  }

  if (usePathname() === "/") return null;

  return (
    <footer className="bg-gradient-to-br from-[#2C3178] to-[#EB1D75] text-white pt-10 pb-10 border-t border-slate-200 px-6">
      <div className=" max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Quick Links */}
        <ul className="font-display text-center md:text-left space-y-2">
          <li>
            <Link href="/about" className="hover:text-orange-500">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:text-orange-500">
              Upcoming Events
            </Link>
          </li>
          <li>
            <Link href="/choirs" className="hover:text-orange-500">
              Choirs
            </Link>
          </li>
          <li>
            <Link href="/result" className="hover:text-orange-500">
              Results
            </Link>
          </li>
        </ul>

        {/* Newsletter */}
        <div className="text-center">
          <h3 className="font-heading font-bold text-lg">
            Subscribe to Our Newsletter
          </h3>
          <p className="font-display text-sm text-slate-300 mb-4">
            Stay updated on the SANS Musical Contest.
          </p>
          <form
            className="flex flex-col justify-center items-center md:flex-row gap-4 "
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              name="subscribe-email"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className={`px-6 py-2 ${
                isSubscribing
                  ? "bg-orange-400 text-gray-300"
                  : "bg-orange-500 text-white"
              } rounded-md hover:bg-orange-600 mb-2 flex items-center justify-center gap-2`}
            >
              {isSubscribing && (
                <svg
                  className="animate-spin h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Contact & Social Media */}
        <div className="text-center md:text-left">
          <p className="text-slate-300">23, Asoge Street, Ijeshatedo, Lagos.</p>
          <p className="font-display text-slate-300">Phone: 08033044390</p>
          <p className="text-slate-300">
            Email:{" "}
            <a
              href="mailto:harmonicchoir1@gmail.com"
              className="hover:underline"
            >
              harmonicchoir1@gmail.com
            </a>
          </p>
          <div className="flex justify-center md:justify-start space-x-6 mt-2">
            <a
              href="https://www.facebook.com/share/1DKxtzaEg5/?mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.instagram.com/harmonicchoir_/profilecard/?igsh=MTV0NWd4NjhoaGw1Mw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.tiktok.com/@harmonicchoir"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/tiktok.svg" alt="TikTok" width={24} height={24} />
            </a>
            <a
              href="http://www.youtube.com/@HarmonicChoir"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/youtube.svg" alt="Youtube" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center items-center mt-12 text-slate-300 dark:text-slate-500">
        <p className="text-center">
          © {new Date().getFullYear()} SANS Musical Contest. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
