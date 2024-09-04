/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
        "deotica": ["Mina", "sans-serif"],
      },
      colors: {
        blueDeotica: "#0284d6"
      }
    },
  },
  plugins: [],
}

