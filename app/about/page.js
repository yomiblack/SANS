"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function About() {
  const images = Array.from(
    { length: 16 },
    (_, i) => `/about/backgrounds/image-${i + 1}.jpg`
  );
  const slidingImages = useMemo(() => images.concat(images), [images]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 md:px-8 overflow-hidden">
      {/* Background Sliding Images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 flex h-full"
          style={{ width: `${slidingImages.length * 100}vw` }}
          animate={{ x: ["0vw", `-${(slidingImages.length / 2) * 100}vw`] }}
          transition={{
            repeat: Infinity,
            duration: 2000,
            ease: "linear",
          }}
        >
          {slidingImages.map((src, index) => (
            <div key={index} className="relative w-screen h-full flex-shrink-0">
              <Image
                src={src}
                alt={`Background ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy" // Defer loading until needed
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Foreground Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white p-6 md:p-10 rounded-lg shadow-lg max-w-3xl w-full text-left z-10 mb-20"
      >
        <h1 className="font-heading text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
          About <span className="font-display text-orange-700">SANS</span>
        </h1>
        <p className=" text-sm md:text-lg leading-relaxed text-gray-700">
          <span className="font-heading text-orange-700 font-semibold">
            &quot;Sing A New Song&quot;
          </span>{" "}
          (SANS) is a transformative initiative that celebrates gospel music. It
          inspires choirs to embrace creativity, originality, and deeper
          spiritual connection, unlocking their artistic potential.
        </p>
        <p className="text-sm md:text-lg leading-relaxed text-gray-700 mt-4">
          SANS seeks to reignite passion for gospel music, encouraging choirs to
          reimagine their craft and instilling a fresh appreciation for
          powerful, timeless melodies. Through this initiative, we hope its
          impact resonates long after the final note is sung.
        </p>
        <div className="mt-6">
          <Image
            src="/icon.png"
            alt="SANS Logo"
            width={20}
            height={15}
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
