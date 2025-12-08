"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoCard from "@/app/components/video/videoCard";
import Loading from "@/app/components/util/loading";


export default function GalleryTemplate({ episode, participants, event }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await participants();
            setData(result);
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
            <motion.h1
                className="text-center text-4xl font-bold text-orange-600 mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {event === 'csr' ? (
                    'Corporate Social Responsibility'
                ) : (
                    <>Experience <span className="font-display">SANS {episode}.0</span></>
                )}
            </motion.h1>

            {data.length === 0 ? (
                <Loading status="Loading media files..." />
            ) : (
                <motion.div
                    className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 },
                            }}
                        >
                            <VideoCard {...item} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
