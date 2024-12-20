import Image from "next/image";

export const metadata = {
  title: "About SANS",
  description: "About SANS Musical Contest",
};

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDEFF4] via-[#FDFCFB] to-[#E8F8F5] px-6">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
          About <span className="text-orange-700">SANS</span>
        </h1>
        <p className="text-sm md:text-lg leading-relaxed text-gray-700">
          <span className="text-orange-700 font-semibold">
            &quot;Sing A New Song&quot;
          </span>
          (SANS) is a transformative initiative that celebrates gospel music. It
          inspires choirs to embrace creativity, originality, and deeper
          spiritual connection, unlocking their artistic potential.
        </p>
        <p className="text-sm md:text-lg leading-relaxed text-gray-700 mt-4">
          SANS seeks to reignite passion for gospel music, encouraging choirs to
          reimagine their craft and instilling a fresh appreciation for
          powerful, timeless melodies. Through this initiative, we hope its
          impact resonates long after the final note is sung.
        </p>
        <div className="mt-8">
          <Image
            src="/icon.png"
            alt="SANS Logo"
            width={25}
            height={20}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
