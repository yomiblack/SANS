"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ResultSummary from "./resultSummary";
import Loading from "../util/loading";

export default function ResultClient({ choirsByTheme }) {
  const [selectedContest, setSelectedContest] = useState("");
  const [choirs, setChoirs] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected index

  async function handleClick(value, index) {
    if (!value) return; // Do nothing if no valid value is selected

    setLoading(true);
    setError(null);

    try {
      // Update the state with the new data and index
      setChoirs(value);
      setSelectedIndex(index + 1); // Store the index + 1
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-center items-center flex-col min-h-screen p-8"
      >
        {/* Welcome Message */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-6 space-y-4"
        >
          <h1 className="font-heading text-4xl font-bold text-orange-600">
            Contest Results
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            Explore the rankings and performances from past events.
          </h2>
        </motion.div>

        {/* Dropdown Selector */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <motion.select
            id="contest"
            className="p-2 border rounded-md bg-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer w-full sm:w-auto text-sm sm:text-base"
            value={selectedContest}
            onChange={(e) => {
              const selectedTheme = e.target.value;
              setSelectedContest(selectedTheme);

              if (selectedTheme === "") {
                // If the default option is selected, reset the state
                setChoirs(null);
                setSelectedIndex(null);
                return;
              }

              // Find the corresponding choir object and its index
              const selectedChoirIndex = choirsByTheme.findIndex(
                (choir) => choir.theme === selectedTheme
              );
              const selectedChoir = choirsByTheme[selectedChoirIndex];

              // Pass the data and index to handleClick
              handleClick(selectedChoir?.data, selectedChoirIndex);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Default option */}
            <option value="" disabled className="text-sm">
              Select Contest
            </option>
            {/* Dynamic options */}
            {choirsByTheme.map((choir, index) => (
              <option
                key={choir.theme}
                value={choir.theme}
                className="font-display text-sm"
              >
                {`SANS ${index + 1}.0`}
              </option>
            ))}
          </motion.select>
        </motion.div>
      </motion.div>

      {/* Display loading or error messages */}
      {loading && <Loading status="Fetching result, please wait..." />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display the result summary only if choirs is not null */}
      {choirs && (
        <ResultSummary
          choirs={choirs}
          index={selectedIndex}
          setChoirs={setChoirs}
          setSelectedContest={setSelectedContest}
        />
      )}
    </>
  );
}
