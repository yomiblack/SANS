"use client";

import { motion } from "framer-motion";

export default function VideoOverlay({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 max-w-4xl w-full bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-2xl"
    >
      {children}
    </motion.div>
  );
}
