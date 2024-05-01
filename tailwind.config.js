/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#1a1a1a',
        'bg-accent': '#0e0e0e',
        'green-1': '#3a8d4c',
        'green-2': '#47ab5d',
        'green-3': '#4ecb71',
        'green-4': '#75ea75',
        'gray-1': '#27272a',
        'gray-2': '#474747',
        'gray-3': '#636363',
        'gray-4': '#979797',
        'gray-5': '#a1a1aa',
        'gray-6': '#bdbdbd',
        'white': '#ffffff',
        'white-1': '#e3e3e3',
        'dark-gray': '#27272A'
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    }
  },
  plugins: [  daisyui,],
}

