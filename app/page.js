import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Welcome!",
    description: "Welcome to SANS Musical Contest!",
    icons: {
      // Example: Include a favicon if needed
      icon: "/sansFullLogo.png",
    },
    extraHeadContent: (
      <link rel="preload" as="image" href="/sansBackground.png" />
    ),
  };
}

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/sansBackground.png')`,
        backgroundSize: "cover", // Ensures the background image covers the entire container
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image
      }}
    >
      <div className="text-center px-4">
        {" "}
        {/* Added padding for mobile devices */}
        {/* Button */}
        <Link href="/choirs">
          <button className="mt-40 md:mt-60 mb-7 md:mb-10 px-6 py-3 text-sm md:text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 rounded-lg shadow-lg transition duration-300">
            Click to Begin
          </button>
        </Link>
      </div>
    </div>
  );
}
