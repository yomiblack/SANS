"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimateWrap({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ y: "100%", opacity: 0 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
