/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      height: {
        '15': '3.75rem', // 60px
        '16': '4rem', // 64px
      },
      minWidth: {
        '15': '3.75rem', // 60px
        '16': '4rem', // 64px
      },
    },
  },
  plugins: [],
}

