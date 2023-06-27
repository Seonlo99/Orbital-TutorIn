/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      "1/2": "50%",
      "1/3": "33.33%",
      "1/4": "25%",
      3.5: "350px",
      4: "400px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
