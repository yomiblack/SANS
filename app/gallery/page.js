import Image from "next/image";
import Link from "next/link";
import { cards } from "./cardData";

export async function generateMetadata() {
  return {
    title: "SANS! - Gallery",
    description: "Experience the thrill of SANS Musical Contest!",
  };
}

export default async function Gallery() {
  return (
    <>
      <h2 className="font-heading mt-7 text-center text-2xl md:text-4xl font-bold text-gray-800 mb-10">
        🎶 Pick a card, dive into the experience 🎭
      </h2>

      <div className="flex justify-center flex-wrap gap-8 px-6 mb-20">
        {cards.map((card, index) => (
          <Link key={index} href={card.href}>
            <div className="group relative w-64 aspect-[3/4] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">

              <Image
                src={card.thumbnail}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       256px"
                className="object-cover"
                priority={index < 2}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition" />

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-white text-xl font-bold drop-shadow-md">
                  {card.title}
                </h3>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
