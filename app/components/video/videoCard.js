"use client";
import { motion } from "framer-motion";

export default function VideoCard({ name, videoURL }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${videoURL.split("v=")[1]}`}
          title={name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
    </motion.div>
  );
}
