/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stávající barvy
        main: '#d162e5',
        'type-syslog': '#3690c0',   
        'type-flow': '#a6761d',     

        // Nové barvy pro typy útoků
        'attack-type-benign': '#4CAF50',     // zelená
        'attack-type-malware': '#FF5722',    // oranžová
        'attack-type-botnet': '#2196F3',     // modrá
        'attack-type-scanning': '#9C27B0',   // fialová
        'attack-type-hijacking': '#FF9800',  // tmavě oranžová
        'attack-type-ddos': '#F44336',       // červená
        'attack-type-worm': '#795548',       // hnědá
        'attack-type-mitm': '#607D8B',       // šedá

        // Definice standardních červených barev
        red: {
          50: '#FEF2F2',   // velmi světle červená pro pozadí
          100: '#FEE2E2',  // světle červená
          200: '#FECACA',  // střední červená pro okraj
          800: '#991B1B'   // tmavě červená pro text
        }
      }
    },
  },
  plugins: [],
};