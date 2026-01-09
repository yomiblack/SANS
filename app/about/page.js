"use client";


import VideoBackground from "@/app/components/media/videoBackground";
import VideoOverlay from "@/app/components/media/videoOverlay";
import Image from "next/image";

export default function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">

      {/* Video Background */}
      <VideoBackground
        src="/videos/sans3.0highlights.mp4"
        poster="/sansFullLogo.png"
      />

      {/* Foreground Content */}
      <VideoOverlay>
        <h1 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">
          About <span className="font-display text-orange-400">SANS</span>
        </h1>

        <p className="text-sm md:text-lg text-gray-200 leading-relaxed">
          <span className="text-orange-400 font-semibold">
            “Sing A New Song”
          </span>{" "}
          (SANS) is a faith-driven initiative dedicated to nurturing creativity,
          excellence, and spiritual depth through gospel music.
        </p>

        <p className="text-sm md:text-lg text-gray-200 leading-relaxed mt-4">
          Beyond music, SANS actively engages in community outreach and corporate social
          responsibility programmes, using art as a tool to uplift lives, inspire hope,
          and give back meaningfully to the society.
        </p>

        <p className="text-sm md:text-lg text-gray-200 leading-relaxed mt-4">
          We welcome partnerships, sponsorships, and collaborations with individuals
          and organizations who share our vision of impact through purpose-driven
          creativity.
        </p>


        <div className="mt-6">
          <Image
            src="/icon.png"
            alt="SANS Logo"
            width={32}
            height={32}
            priority
          />
        </div>
      </VideoOverlay>
    </div>
  );
}
