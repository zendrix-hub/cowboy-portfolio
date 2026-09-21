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
        bungee: ["var(--font-bungee)", "sans-serif"],
        lexend: ["var(--font-lexend)", "system-ui", "sans-serif"],
        sans: ["var(--font-lexend)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sun: {
          DEFAULT: "#FFC72C",
          depth: "#CC9F23",
        },
        signal: {
          DEFAULT: "#E4262A",
          depth: "#B61E22",
        },
        cobalt: {
          DEFAULT: "#1B3FD1",
          depth: "#1632A7",
        },
        leaf: {
          DEFAULT: "#0F9D58",
          depth: "#0C7E46",
        },
        chalk: {
          DEFAULT: "var(--chalk)",
          depth: "var(--chalk-depth)",
          plate: "var(--chalk-plate)",
          text: "var(--chalk-plate-text)",
        },
        enamel: {
          DEFAULT: "#000000",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "8px",
        md: "8px",
        lg: "8px",
        xl: "8px",
        "2xl": "8px",
        "3xl": "8px",
        full: "9999px",
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  plugins: [],
};

export default config;
