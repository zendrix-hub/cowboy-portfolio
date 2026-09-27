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
        lora: ["var(--font-lora)", "Georgia", "serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        courier: ["var(--font-courier-prime)", "Courier New", "monospace"],
        caveat: ["var(--font-caveat)", "cursive"],
        mono: ["var(--font-courier-prime)", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        desk: "var(--desk)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        tape: "var(--tape)",
        "tape-light": "var(--tape-light)",
        stamp: "var(--stamp)",
      },
      boxShadow: {
        lift: "var(--lift)",
        "lift-hover": "var(--lift-hover)",
      },
    },
  },
  plugins: [],
};

export default config;
