/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hlavní barva
        main: '#d162e5',
        
        // Typy
        'type-syslog': '#3690c0',   
        'type-flow': '#a6761d',     
      }
    },
  },
  plugins: [],
};