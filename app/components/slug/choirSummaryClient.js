"use client";

import ScoreSummary from "@/app/components/slug/scoreSummary";
import { useEffect, useState } from "react";
import Loading from "../util/loading";
import choirsDatabase from "../action/choirsDatabase";

export default function ChoirSummaryClient({ currentPage, cluster }) {
  const [choirs, setChoirs] = useState(null);
  const [error, setError] = useState(null);
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    if (!currentPage || !cluster || choirs) return; // Prevent unnecessary fetches

    const fetchData = async () => {
      try {
        const data = await choirsDatabase();
        const themeIndex = data.findIndex((choir) => choir.theme === cluster);

        if (!data) throw new Error("No data returned");
        const foundCluster = data[themeIndex];
        const foundChoir = foundCluster.data.find(
          (choir) => choir._id === currentPage
        );
        setChoirs(foundChoir);
        setEpisode(themeIndex + 1);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [currentPage, cluster, choirs]); // Runs when currentPage or cluster changes

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!choirs) return <Loading>Loading...</Loading>;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Main Content */}
      <main className="p-4 md:p-6 overflow-x-auto w-full h-full flex justify-center items-center">
        <div className="max-w-4xl w-full">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            Choir Summary
          </h2>
          {choirs ? (
            <div className="overflow-x-auto">
              <ScoreSummary choirs={choirs} episode={episode} />
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </main>
    </div>
  );
}
