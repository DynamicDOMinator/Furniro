/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/tw-elements/js/**/*.js"],
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
};