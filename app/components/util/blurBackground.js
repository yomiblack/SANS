"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function BlurBackground({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-lg z-50 p-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Modal Container */}
        <motion.div
          className="bg-white rounded-lg shadow-xl max-h-[90vh] w-full max-w-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          {/* Modal Content */}
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
