import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        coral: {
          50: "#fff5f5",
          100: "#ffe0e0",
          400: "#ff8a80",
          500: "#ff6b6b",
        },
        lavender: {
          50: "#f5f0ff",
          100: "#e8dff5",
          400: "#b39ddb",
          500: "#a18cd1",
        },
        mint: {
          50: "#e8faf5",
          100: "#b2f5ea",
          400: "#43e97b",
          500: "#38f9d7",
        },
        indigo: {
          50: "#eef2ff",
          100: "#ddd6fe",
          400: "#818cf8",
          500: "#667eea",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#f7971e",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          400: "#4facfe",
          500: "#00f2fe",
        },
      },
      borderRadius: {
        pill: "100px",
        card: "20px",
        "inner-btn": "14px",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3) translateY(40px)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        rainbowShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-up-1": "slideUp 0.6s ease-out 0.1s forwards",
        "slide-up-2": "slideUp 0.6s ease-out 0.2s forwards",
        "bounce-in": "bounceIn 0.6s ease-out forwards",
      },
      transitionTimingFunction: {
        elastic: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
