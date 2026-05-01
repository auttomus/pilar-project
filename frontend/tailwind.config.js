/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00355f",
        "primary-container": "#0f4c81",
        secondary: "#466270",
        background: "#f9f9fc",
        surface: "#ffffff",
        "outline-variant": "#c2c7d1",
      },
      fontFamily: {
        // Menyesuaikan dengan gaya editorial yang tegas
        serif: ["Newsreader", "serif"],
        sans: ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
