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
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        condensed: ["var(--font-barlow-condensed)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        kalam: ["var(--font-kalam)", "cursive"],
      },
      colors: {
        desk: "var(--desk)",
        sheet: "var(--sheet)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
        },
        rule: "var(--rule)",
        redline: "var(--redline)",
        focus: "var(--focus)",
      },
      borderRadius: {
        none: "0",
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      boxShadow: {
        none: "none",
        DEFAULT: "none",
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
      },
    },
  },
  plugins: [],
};

export default config;
