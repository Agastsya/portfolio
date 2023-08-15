/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: { sm: "480px" },
    },
    fontSize: {
      "7xl": "14rem",
      normal: "1.4rem",
    },
    lineHeight: {
      "extra-loose": "2.5",
      12: "3rem",
    },
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
  },
  plugins: [],
};
