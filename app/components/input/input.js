"use client";
import { motion } from "framer-motion";

export default function Input({ children, name, type, placeholder }) {
  const activeClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700";

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {children}
      </label>
      <motion.input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        step="any"
        // required
        className={`w-full px-4 py-2 border rounded-md ${activeClass}`}
        initial={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
        whileFocus={{
          boxShadow: "0px 0px 10px rgba(99, 102, 241, 0.5)",
          transition: { duration: 0.3 },
          scale: 1.1,
        }}
        whileHover={{ scale: 1.05 }}
      />
    </div>
  );
}
