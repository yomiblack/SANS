"use client";
import { motion } from "framer-motion";

export default function Textarea({ judges }) {
  const activeClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700";

  return (
    <div className="mb-6">
      {judges.map((judge, index) => (
        <div key={index} className="mb-4">
          <label
            htmlFor={`comment_${index}`}
            className="font-display block font-semibold mb-2"
          >
            {judge}&apos;s Comments
          </label>
          <motion.textarea
            id={`comment_${index}`}
            name={`comment_${index}`}
            rows="3"
            placeholder={`Enter ${judge}'s comments here`}
            className={`w-full border border-gray-300 rounded-md p-2 ${activeClass}`}
            initial={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
            whileFocus={{
              boxShadow: "0px 0px 10px rgba(99, 102, 241, 0.5)",
              transition: { duration: 0.3 },
              scale: 1.1,
            }}
            whileHover={{ scale: 1.05 }}
          />
        </div>
      ))}
    </div>
  );
}
