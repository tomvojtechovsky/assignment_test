/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'type-all': '#d162e5',      // fialková
        'type-syslog': '#3690c0',   // modrá
        'type-flow': '#a6761d',     // hnědá
      }
    },
  },
  plugins: [],
};
