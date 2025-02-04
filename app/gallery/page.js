"use server";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "SANS! - Gallery",
    description: "Experience the thrill of SANS Musical Contest!",
    openGraph: {
      title: "SANS! - Gallery",
      description: "Discover the best musical talents in the SANS contest.",
      url: "https://sans-fawn.vercel.app",
      type: "website",
    },
  };
}

// Array of card data
const cards = [
  {
    title: "SANS 1.0",
    href: "/gallery/sans1.0",
    from: "from-blue-500",
    to: "to-green-500",
    hoverFrom: "hover:from-green-600",
    hoverTo: "hover:to-blue-600",
  },
  {
    title: "SANS 2.0",
    href: "/gallery/sans2.0",
    from: "from-[#A9FF68]",
    to: "to-[#FF8989]",
    hoverFrom: "hover:from-[#FF8989]",
    hoverTo: "hover:to-[#A9FF68]",
  },
  {
    title: "SANS 3.0",
    href: "/gallery/sans3.0",
    from: "from-purple-500",
    to: "to-pink-500",
    hoverFrom: "hover:from-pink-600",
    hoverTo: "hover:to-purple-600",
  },
  {
    title: "Retreat",
    href: "/gallery/retreat",
    from: "from-yellow-500",
    to: "to-red-500",
    hoverFrom: "hover:from-red-600",
    hoverTo: "hover:to-yellow-600",
  },
  {
    title: "Outreach",
    href: "/gallery/outreach",
    from: "from-orange-500",
    to: "to-gray-500",
    hoverFrom: "hover:from-gray-600",
    hoverTo: "hover:to-orange-600",
  },
];

export default async function Gallery() {
  return (
    <>
      <h2 className="font-heading mt-7 text-center text-2xl md:text-4xl font-bold text-gray-800 mb-8">
        🎶 Pick a card, dive into the experience, and feel the rhythm! 🎭✨
      </h2>

      <div className="flex justify-center items-center flex-wrap gap-10 mt-20 mb-20">
        {cards.map((card, index) => (
          <Link key={index} href={card.href}>
            <div
              className={`w-60 h-60 bg-gradient-to-r ${card.from} ${card.to} rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:rotate-3 cursor-pointer hover:shadow-2xl ${card.hoverFrom} ${card.hoverTo}`}
            >
              <div className="font-display flex justify-center items-center h-full text-white text-xl md:text-2xl font-bold">
                {card.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
