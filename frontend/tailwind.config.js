/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bg: "#f5f5f5",
        btn: "#A7C7E7",
        otherbtn: "#A7A6A4",
        textBtn: "#fff",
        btnHover: "#8BD9D9",
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
