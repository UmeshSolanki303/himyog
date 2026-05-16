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
        // Primary — Rose Maroon (logo's main silhouette & lotus)
        sage: {
          50: "#FDF5F8",
          100: "#F8DEE8",
          200: "#F0BCCC",
          300: "#E490B4",
          400: "#CB6490",
          500: "#B84070", // logo's main rose tone
          600: "#9C2458", // deep rose
          700: "#7C1440", // dark maroon (logo top)
          800: "#621030",
          900: "#4C0C24",
        },
        // Background — Cream Ivory
        beige: {
          50: "#FDFAF8",
          100: "#FAF5EF",
          200: "#F5EAE0",
          300: "#EDD8C8",
          400: "#E0C4B0",
        },
        // Warm Peach — baby figure & highlight tones from logo
        peach: {
          50: "#FEF9F5",
          100: "#FDF0E8",
          200: "#F8D4B4",
          300: "#F0B488",
          400: "#E49060",
        },
        // Leaf Green — botanical element in logo
        "warm-sage": {
          50: "#F2F8EE",
          100: "#E2EFD4",
          200: "#C0DAAA",
          300: "#88BA70",
          400: "#567E40",
          500: "#3C6028",
          600: "#2C4820",
        },
        // Gold — decorative circle border & infinity symbol in logo
        gold: {
          50: "#FEF9E8",
          100: "#FBF0C4",
          200: "#F5DC88",
          300: "#ECC44A",
          400: "#D4A428",
          500: "#B88818",
          600: "#9A7010",
        },
        // Text — Warm Charcoal (plum-tinted to complement rose palette)
        charcoal: {
          DEFAULT: "#3D2830",
          light: "#6B4852",
          dark: "#2A1820",
        },
        slate: {
          muted: "#7A6870",
          soft: "#A89698",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(184, 64, 112, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg":
          "0 10px 40px -4px rgba(184, 64, 112, 0.12), 0 4px 16px -4px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
