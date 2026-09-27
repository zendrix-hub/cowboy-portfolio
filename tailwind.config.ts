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
        serif: ["var(--font-shippori-mincho)", "serif"],
        sans: ["var(--font-zen-kaku)", "sans-serif"],
      },
      colors: {
        ground: "var(--ground)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        mark: "var(--mark)",
      },
    },
  },
  plugins: [],
};

export default config;
