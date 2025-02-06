"use server";
import Image from "next/image";

const retreatOptions = [
  {
    title: "Zen Haven",
    videoUrl: "/retreat/season1/videos/sans1retreat_1.mp4",
    images: [
      "/retreat/season1/images/sans1retreat_1.jpg",
      "/retreat/season1/images/sans1retreat_2.jpg",
      "/retreat/season1/images/sans1retreat_3.jpg",
    ],
  },
  {
    title: "Tranquil Oasis",
    // videoUrl: "https://www.youtube.com/embed/example2",
    videoUrl: "/retreat/season2/videos/sans2retreat_1.mp4",
    images: [
      "/retreat/season2/images/sans2retreat_1.jpeg",
      "/retreat/season2/images/sans2retreat_2.jpeg",
      "/retreat/season2/images/sans2retreat_3.jpeg",
    ],
  },
];

export default async function Retreat() {
  return (
    <div className="p-5 font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold mb-10 text-gray-800">
        Transformative Getaways
      </h1>

      {/* Retreat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {retreatOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Video Section */}
            <div className="relative aspect-video">
              {option.videoUrl.includes("youtube") ? (
                <iframe
                  src={option.videoUrl}
                  title={`${option.title} Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              ) : (
                <video
                  controls
                  className="w-full h-full rounded-lg"
                  preload="metadata"
                  poster={option.images?.[0]} // Uses first image as poster
                >
                  <source src={option.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 p-4">
              {option.title}
            </h2>

            {/* Images Section */}
            <div className="grid grid-cols-3 gap-2 p-4">
              {option.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={image}
                    alt={`${option.title} Image ${imgIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                    // loading="lazy"
                    priority
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Call-to-Action Button */}
            <div className="p-4 text-center">
              <button className="w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
