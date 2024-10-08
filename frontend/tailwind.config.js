/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bg: "#f5f5f5",
        btn: "#F59E0B",
        otherbtn: "#A7A6A4",
        textBtn: "#fff",
        primary: "#1F2937",
        btnHover: "#8BD9D9",
        customZebraOdd: "#d1d5db", // Couleur des lignes impaires
        customZebraEven: "#9ca3af", // Couleur des lignes paires
      },
      boxShadow: {
        custom: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      fontFamily: {
        main: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
