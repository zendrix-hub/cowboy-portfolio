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
        display: ["var(--font-bebas-neue)", "sans-serif"],
        sans: ["var(--font-archivo-narrow)", "sans-serif"],
      },
      colors: {
        frame: "var(--frame)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        tally: "var(--tally)",
      },
    },
  },
  plugins: [],
};

export default config;
