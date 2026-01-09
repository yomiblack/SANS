"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoCard from "@/app/components/video/videoCard";
import VideoModal from "@/app/components/video/videoModal";
import Loading from "@/app/components/util/loading";

export default function GalleryTemplate({ episode, participants, event }) {
    const [data, setData] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await participants();
            setData(result);
        }
        fetchData();
    }, [participants]);

    function getVideoId(url) {
        return url.split("v=")[1];
    }

    return (
        <div className="min-h-screen bg-neutral-900 p-8">
            <motion.h1
                className="text-center text-4xl font-bold text-orange-500 mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {event === "csr"
                    ? "Corporate Social Responsibility"
                    : <>Experience <span className="font-display">SANS {episode}.0</span></>}
            </motion.h1>

            {data.length === 0 ? (
                <Loading status="Loading media files..." />
            ) : (
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                    {data.map((item, index) => {
                        const videoId = getVideoId(item.videoURL);

                        return (
                            <VideoCard
                                key={index}
                                name={item.name}
                                videoId={videoId}
                                onClick={() => setActiveVideo({ videoId, title: item.name })}
                            />
                        );
                    })}
                </motion.div>
            )}

            {/* Modal Player */}
            <VideoModal
                videoId={activeVideo?.videoId}
                title={activeVideo?.title}
                onClose={() => setActiveVideo(null)}
            />
        </div>
    );
}
