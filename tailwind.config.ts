import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // MoneyPiol Design System
        emerald: {
          DEFAULT: "#00C48C",
          50: "#E6FFF8",
          100: "#CCFFF1",
          200: "#99FFE3",
          300: "#66FFD5",
          400: "#33FFC7",
          500: "#00C48C",
          600: "#009D70",
          700: "#007654",
          800: "#004E38",
          900: "#00271C",
        },
        amber: {
          DEFAULT: "#FF6B35",
          50: "#FFF3EE",
          100: "#FFE7DD",
          200: "#FFCFBB",
          300: "#FFB799",
          400: "#FF9F77",
          500: "#FF6B35",
          600: "#E5501A",
          700: "#BF3E12",
          800: "#992D0B",
          900: "#731C05",
        },
        indigo: {
          DEFAULT: "#5B21FE",
          50: "#F0EBFF",
          100: "#E1D7FF",
          200: "#C3AFFF",
          300: "#A587FF",
          400: "#875FFF",
          500: "#5B21FE",
          600: "#4A1AE5",
          700: "#3913BF",
          800: "#280D99",
          900: "#170773",
        },
        dark: {
          bg: "#070E1A",
          surface: "#0D1829",
          card: "#111F35",
          border: "#1E3050",
          muted: "#2A4060",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "emerald-glow": "radial-gradient(ellipse at 50% 0%, rgba(0,196,140,0.15) 0%, transparent 70%)",
        "grid-dark": "linear-gradient(rgba(30,48,80,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,48,80,0.4) 1px, transparent 1px)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
