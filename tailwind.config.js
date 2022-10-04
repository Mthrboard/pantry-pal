/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./views/**/*.ejs",
            "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:"#eff6ff",
          100:"#dbeafe",
          200:"#bfdbfe",
          300:"#93c5fd",
          400:"#60a5fa",
          500:"#3b82f6",
          600:"#2563eb",
          700:"#1d4ed8",
          800:"#1e40af",
          900:"#1e3a8a"
        },
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
  plugins: [require("daisyui"), require("flowbite/plugin")],
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
