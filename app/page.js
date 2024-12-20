import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/sansBackground.png" />
      </Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/sansBackground.png')`,
        }}
      >
        <div className="text-center">
          {/* Button */}
          <Link href="/choirs">
            <button className="mt-40 md:mt-60 mb-7 md:mb-10 px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 rounded-lg shadow-lg transition duration-300">
              Click to Begin
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
