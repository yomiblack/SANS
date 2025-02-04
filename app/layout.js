import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import PageLayout from "./components/util/pageLayout";
import "./globals.css";
import choirsDatabase from "./components/action/choirsDatabase";

export const metadata = {
  title: "SANS! - Musical Contest",
  description: "Experience the thrill of SANS Musical Contest!",
  openGraph: {
    title: "SANS! - Musical Contest",
    description: "Discover the best musical talents in the SANS contest.",
    url: "https://sans-fawn.vercel.app",
    type: "website",
  },
};
// Google Fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

export default async function RootLayout({ children }) {
  const choirsByTheme = await choirsDatabase();
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#2C3178] via-[#FDFCFB] to-[#EB1D75]">
          <PageLayout choirsByTheme={choirsByTheme}>{children}</PageLayout>
        </div>
      </body>
    </html>
  );
}
