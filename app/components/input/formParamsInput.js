import { motion } from "framer-motion";

export default function FormParamsInput({
  name,
  placeholder,
  type,
  setNumberOfJudges = null,
  activeClass,
  setHarvestTheme = null,
  setSansEpisode = null,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="capitalize block text-sm font-medium text-gray-700 mb-2 text-center md:text-left"
      >
        {name}
      </label>
      <motion.input
        type={type}
        max={name === "Number of Judges" ? "5" : undefined}
        min="1"
        placeholder={placeholder}
        required
        className={`capitalize w-full px-4 py-2 border rounded-md ${activeClass}`}
        initial={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
        whileFocus={{
          boxShadow: "0px 0px 10px rgba(99, 102, 241, 0.5)",
          transition: { duration: 0.3 },
          scale: 1.1,
        }}
        whileHover={{ scale: 1.05 }}
        onChange={(e) => {
          const value = Math.min(e.target.value, 5);
          if (setNumberOfJudges) setNumberOfJudges(value); // Only if defined
          if (setHarvestTheme) setHarvestTheme(e.target.value); // Only if defined
          if (setSansEpisode) setSansEpisode(e.target.value); // Only if defined
        }}
      />
    </div>
  );
}
