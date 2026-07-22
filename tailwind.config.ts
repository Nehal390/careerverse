import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Semantic tokens — backed by CSS variables in globals.css so the
        // entire app re-themes on the .dark class without touching every
        // component. Light mode is the default; dark is opt-in.
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
          glass: "rgb(var(--foreground) / 0.04)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted-fg) / <alpha-value>)",
        // Accent scale — calibrated for AA-readable text on both light and
        // dark surfaces, softened from the original neon/electric tones.
        primary: {
          DEFAULT: "#6366F1",
          50: "#EEF2FF",
          100: "#E0E7FF",
          400: "#4F46E5",
          500: "#6366F1",
          600: "#4338CA",
          700: "#3730A3",
        },
        secondary: {
          DEFAULT: "#14B8A6",
          100: "#CCFBF1",
          400: "#0D9488",
          500: "#14B8A6",
          600: "#0F766E",
        },
        accent: {
          DEFAULT: "#F472B6",
          100: "#FCE7F3",
          400: "#DB2777",
          500: "#F472B6",
          600: "#BE185D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 2px rgb(var(--foreground) / 0.04)",
        card: "0 1px 3px rgb(var(--foreground) / 0.06), 0 1px 2px rgb(var(--foreground) / 0.04)",
        "card-hover": "0 12px 24px -8px rgb(var(--foreground) / 0.12)",
        popover: "0 8px 30px rgb(var(--foreground) / 0.12)",
      },
      backgroundImage: {
        "aurora-glow":
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 20%), rgb(99 102 241 / 0.10), transparent 60%)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-3%, 4%) scale(0.96)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        aurora: "aurora 26s ease-in-out infinite",
        "float-y": "float-y 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 2s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
