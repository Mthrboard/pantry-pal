/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        }
      },
      fontFamily: {
        body: ['Nunito']
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ['light','forest'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "forest",
  }
}
