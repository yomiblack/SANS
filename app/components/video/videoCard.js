"use client";
import { motion } from "framer-motion";

export default function VideoCard({ name, videoURL }) {
  return (
    <motion.div
      className="relative bg-white/20 backdrop-blur-md shadow-md overflow-hidden cursor-pointer border border-white/20 hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoURL.split("v=")[1]}`}
          title={name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-900 text-left truncate">{name}</h3>
      </div>
    </motion.div>
  );
}
