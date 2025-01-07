// src/constants/colors.ts

// Typy dat v aplikaci
export type DataType = 'all' | 'syslog' | 'dataflow';

// Rozhraní pro barevné schéma
interface ColorScheme {
  button: {
    active: string;    // Třídy pro aktivní tlačítko
    inactive: string;  // Třídy pro neaktivní tlačítko
  }
  chart: string;       // HEX barva pro graf
  background: {
    light: string;     // Světlá varianta pro pozadí
    hover: string;     // Hover varianta pro pozadí
  }
}

// Předpřipravené barevné třídy pro jednotlivé typy
export const TYPE_COLORS: Record<DataType, ColorScheme> = {
  all: {
    button: {
      active: 'bg-type-all text-white hover:bg-type-all/80',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    },
    chart: '#d162e5',
    background: {
      light: 'bg-type-all/10',
      hover: 'bg-type-all/20'
    }
  },
  syslog: {
    button: {
      active: 'bg-type-syslog text-white hover:bg-type-syslog/80',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    },
    chart: '#3690c0',
    background: {
      light: 'bg-type-syslog/10',
      hover: 'bg-type-syslog/20'
    }
  },
  dataflow: {
    button: {
      active: 'bg-type-flow text-white hover:bg-type-flow/80',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    },
    chart: '#a6761d',
    background: {
      light: 'bg-type-flow/10',
      hover: 'bg-type-flow/20'
    }
  }
};