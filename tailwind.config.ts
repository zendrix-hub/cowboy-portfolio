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
        mono: ["var(--font-space-mono)", "monospace"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        board: "var(--board)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        marker: "var(--marker)",
      },
      borderRadius: {
        node: "8px",
        stadium: "9999px",
      },
      maxWidth: {
        node: "720px",
      },
    },
  },
  plugins: [],
};

export default config;
