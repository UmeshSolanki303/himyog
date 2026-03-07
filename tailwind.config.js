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
        sage: {
          50: "#f4f6f2",
          100: "#e8ebe4",
          200: "#d4dcc9",
          300: "#b5c2a4",
          400: "#94a37d",
          500: "#7a8b62",
          600: "#5f6e4c",
          700: "#4c573d",
          800: "#404833",
          900: "#373d2d",
        },
        beige: {
          50: "#faf9f7",
          100: "#f5f3ef",
          200: "#ebe7e0",
          300: "#ddd6ca",
          400: "#c9bfae",
        },
        peach: {
          50: "#fdf6f4",
          100: "#fceee9",
          200: "#f9ddd4",
          300: "#f4c4b5",
          400: "#eca48d",
        },
        charcoal: {
          DEFAULT: "#3d4248",
          light: "#5a6068",
          dark: "#2a2e33",
        },
        slate: {
          muted: "#6b7280",
          soft: "#9ca3af",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(122, 139, 98, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg":
          "0 10px 40px -4px rgba(122, 139, 98, 0.12), 0 4px 16px -4px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
