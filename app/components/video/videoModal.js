"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal({ videoId, onClose, title }) {
    if (!videoId) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black"
                    >
                        <X />
                    </button>

                    {/* Player (ONLY ONE iframe exists) */}
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
