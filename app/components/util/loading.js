"use client";
import { motion } from "framer-motion";

export default function Loading({ status }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.span
          className="block w-4 h-4 bg-orange-500 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0,
          }}
        />
        <motion.span
          className="block w-4 h-4 bg-orange-500 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.2,
          }}
        />
        <motion.span
          className="block w-4 h-4 bg-orange-500 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.4,
          }}
        />
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-medium text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {status ? status : "Loading..."}
      </motion.p>
    </div>
  );
}
