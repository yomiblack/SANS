/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: false, // Disable dark mode
    extend: {
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"], // Headings
        body: ["var(--font-inter)", "sans-serif"], // Body text
        display: ["var(--font-playfair)", "serif"], // Decorative text
      },
    },
  },
  plugins: [],
};
