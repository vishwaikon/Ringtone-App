/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Adjust the path if your components are elsewhere
  theme: {
    extend: {
      colors: {
        primary: '#7E40CD',
        primaryhover: '#9A53F3',
        secondary: '#EEEEEE',
      },
    },
  },
  plugins: [],
}