"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) return null;

  return (
    <footer className="bg-gradient-to-br from-[#2C3178]  to-[#EB1D75] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src="/sansFullLogo.png"
              alt="SANS Full Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
            <p className="text-sm text-center md:text-left">
              SANS is an initiative celebrating gospel music. Join us as we
              inspire creativity, originality, and deeper spiritual connection.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-orange-500">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link href="/contact" className="hover:text-orange-500">
                  Contact
                </Link>
              </li> */}
              {/* <li>
                <Link href="/terms" className="hover:text-orange-500">
                  Terms & Privacy
                </Link>
              </li> */}
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
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-bold text-lg">Contact</h3>
            <p>Address: 23, Asoge Street, Ijeshatedo, Lagos.</p>
            <p>Phone: 08033044390</p>
            <p>
              Email:{" "}
              <a
                href="mailto:harmonicchoir1@gmail.com"
                className="hover:underline"
              >
                harmonicchoir1@gmail.com
              </a>
            </p>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
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
                  className="hover:opacity-80"
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
                  className="hover:opacity-80"
                />
              </a>
              <a
                href="https://www.tiktok.com/@harmonicchoir"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/tiktok.svg"
                  alt="TikTok"
                  width={24}
                  height={24}
                  className="hover:opacity-80"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8">
          <h3 className="font-bold text-lg text-center md:text-left">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-center md:text-left text-sm mb-4">
            Stay updated with the latest updates about the SANS Musical Contest.
          </p>
          <form className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 text-black rounded-md w-full md:w-2/3"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} SANS Musical Contest. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
