import Link from "next/link";
export default function HomePage() {
  return (
    <div className="home-bg min-h-screen flex items-center justify-center">
      <Link href="/gallery">
        <button className="mt-40 md:mt-60 px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
          Click to Begin
        </button>
      </Link>
    </div>
  );
}
