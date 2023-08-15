/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: { sm: "480px" },
    },
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
  },
  plugins: [],
};
