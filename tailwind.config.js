/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Dusty Rose (Lotus Bloom palette)
        sage: {
          50: "#fdf6f5",
          100: "#f9e8e6",
          200: "#f2cdc9",
          300: "#e5aba5",
          400: "#d99490",
          500: "#C9847A",
          600: "#b36d63",
          700: "#8f534a",
          800: "#7a4540",
          900: "#653a36",
        },
        // Background — Cream Ivory
        beige: {
          50: "#fdfaf8",
          100: "#FAF5EF",
          200: "#f4ebe0",
          300: "#e8d5c6",
          400: "#d9bfaa",
        },
        // Secondary — Blush Pink
        peach: {
          50: "#fef8f6",
          100: "#fdf0eb",
          200: "#F0C4B8",
          300: "#e5a898",
          400: "#d48878",
        },
        // Accent — Warm Sage Green
        "warm-sage": {
          50: "#f3f7f3",
          100: "#e2ede2",
          200: "#c4dbc5",
          300: "#8FAF8A",
          400: "#6e9470",
          500: "#547a56",
          600: "#406142",
        },
        // Text — Warm Charcoal
        charcoal: {
          DEFAULT: "#3D3531",
          light: "#6b5a56",
          dark: "#2a2320",
        },
        slate: {
          muted: "#7a6b68",
          soft: "#a89694",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(201, 132, 122, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg":
          "0 10px 40px -4px rgba(201, 132, 122, 0.12), 0 4px 16px -4px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
