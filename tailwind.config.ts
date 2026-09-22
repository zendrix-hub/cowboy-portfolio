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
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "serif"],
        hanken: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      colors: {
        fg: "var(--fg)",
        "fg-2": "var(--fg-2)",
        line: "var(--line)",
      },
    },
  },
  plugins: [],
};

export default config;
