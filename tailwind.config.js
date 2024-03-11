/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: '#2D4059',
      secondary: '#F07B3F'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

