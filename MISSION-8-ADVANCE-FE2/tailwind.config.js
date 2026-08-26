/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Pastikan pola ini ada
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}