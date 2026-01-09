"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

export default function VideoCard({ name, videoId, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      className="relative cursor-pointer group rounded-xl overflow-hidden bg-black shadow-lg"
    >
      {/* Thumbnail */}
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={name}
        className="w-full aspect-video object-cover"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <div className="bg-white/90 p-4 rounded-full">
          <Play className="text-black w-8 h-8" />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-2 left-3 right-3 text-white text-sm font-semibold truncate opacity-0 group-hover:opacity-100 transition">
        {name}
      </div>
    </motion.div>
  );
}
