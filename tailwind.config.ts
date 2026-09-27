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
        space: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        public: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        jetbrains: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        field: "var(--field)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        gold: "var(--gold)",
      },
    },
  },
  plugins: [],
};

export default config;
