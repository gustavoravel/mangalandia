/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C42421',
          dark: '#9C3533',
          light: '#F00400',
        },
        secondary: {
          DEFAULT: '#703938',
          dark: '#452F2E',
          darker: '#332B2B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        manga: ['Bangers', 'cursive'],
      },
    },
  },
  plugins: [],
};