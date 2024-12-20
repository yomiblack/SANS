import localFont from "next/font/local";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SANS2.0 Gratitude!",
  description: "Welcome to SANS Musical Contest!",
  viewport: "width=device-width, initial-scale=1.0", // Add viewport here
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#2C3178] via-[#FDFCFB] to-[#EB1D75]">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
