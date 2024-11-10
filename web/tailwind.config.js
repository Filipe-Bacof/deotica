/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
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

