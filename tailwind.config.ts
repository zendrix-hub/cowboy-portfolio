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
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
        work: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        ground: "var(--ground)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        spot: "var(--spot)",
      },
    },
  },
  plugins: [],
};

export default config;
