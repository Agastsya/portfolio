/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: { sm: "480px" },
    },
    fontSize: {
      "7xl": "14rem",
      "2xl": "7rem",
      xl: "4rem",
      normal: "1.4rem",
      justsmall: "2.4rem",
    },
    lineHeight: {
      "extra-loose": "2.5",
      12: "12rem",
      5: "6rem",
    },
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
  },
  plugins: [],
};
