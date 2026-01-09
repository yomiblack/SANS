"use client";

import {
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Sans3() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);


  /* ---------- Controls ---------- */
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  /* ---------- Sync autoplay ---------- */
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  /* ---------- Pause on tab blur ---------- */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* ---------- Keyboard shortcuts ---------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (!videoRef.current) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }

      if (e.code === "KeyM") {
        setMuted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying, togglePlay]);

  /* ---------- Video progress ---------- */
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    video.currentTime = percentage * video.duration;
  };

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/videos/sans3.0highlights.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-3xl text-white">
        <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-4">
          SANS 3.0
        </h1>

        <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
          A celebration of sound, passion, and unforgettable performances.
          Experience the journey like never before.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={() => setMuted(!muted)}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/60 hover:bg-white/10 transition"
            aria-label="Toggle mute"
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-white/20 cursor-pointer transition-opacity ${showControls ? "opacity-100" : "opacity-0"
          }`}
        onClick={handleSeek}
      >
        <div
          className="h-full bg-red-600"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
