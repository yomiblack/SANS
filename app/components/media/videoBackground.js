"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function VideoBackground({
  src,
  poster,
  overlay = true,
}) {
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCanPlay(false);
    } else {
      setCanPlay(true);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {canPlay ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="w-full h-full object-cover scale-105"
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={poster}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      )}

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      )}
    </div>
  );
}
