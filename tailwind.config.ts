import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-overpass)", "sans-serif"],
        sans: ["var(--font-karla)", "sans-serif"],
      },
      colors: {
        low: "var(--low)",
        mid: "var(--mid)",
        high: "var(--high)",
        peak: "var(--peak)",
        ink: "var(--ink)",
        contour: "var(--contour)",
      },
    },
  },
  plugins: [],
};

export default config;
