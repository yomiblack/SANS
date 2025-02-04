"use client";
import { FixedSizeList as List } from "react-window";
import VideoCard from "@/app/components/video/videoCard";
import { motion } from "framer-motion";
import participants1 from "@/app/components/util/participants1.0";
import { useState, useEffect } from "react";
import Loading from "@/app/components/util/loading";

const Row = ({ index, style, data }) => (
  <motion.div
    style={style}
    className="flex justify-center items-center w-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="w-full max-w-md">
      <VideoCard {...data[index]} />
    </div>
  </motion.div>
);

export default function Sans1() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchParticipants() {
      const result = await participants1();
      setData(result);
    }
    fetchParticipants();
  }, []);

  return (
    <div className="font-heading min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Header */}
      <motion.h1
        className="text-center text-3xl font-bold text-orange-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience <span className="font-display">SANS 1.0</span>
      </motion.h1>

      {/* Render List only when data is available */}
      {data.length > 0 ? (
        <List
          height={600} // List viewport height
          width="100%" // Responsive width
          itemCount={data.length} // Use `data.length`
          itemSize={320} // Adjust height for proper spacing
          itemData={data} // Pass data to Row
        >
          {({ index, style }) => (
            <Row index={index} style={style} data={data} />
          )}
        </List>
      ) : (
        <Loading status={"Loading media files. Please wait..."} />
      )}
    </div>
  );
}
