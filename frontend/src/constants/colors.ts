// src/constants/colors.ts

// Hlavní barva aplikace
export const MAIN_COLOR = '#d162e5';

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

// Mapování barev pro jednotlivé typy
const TYPE_COLOR_VALUES = {
  all: MAIN_COLOR,      // Používáme hlavní barvu pro 'all'
  syslog: '#3690c0',
  dataflow: '#a6761d'
} as const;

// Předpřipravené barevné třídy pro jednotlivé typy
export const TYPE_COLORS: Record<DataType, ColorScheme> = {
  all: {
    button: {
      active: 'bg-main text-white hover:bg-main/80',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    },
    chart: TYPE_COLOR_VALUES.all,
    background: {
      light: 'bg-main/10',
      hover: 'bg-main/20'
    }
  },
  syslog: {
    button: {
      active: 'bg-type-syslog text-white hover:bg-type-syslog/80',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    },
    chart: TYPE_COLOR_VALUES.syslog,
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
    chart: TYPE_COLOR_VALUES.dataflow,
    background: {
      light: 'bg-type-flow/10',
      hover: 'bg-type-flow/20'
    }
  }
};

// Helper pro získání hex barvy podle typu
export const getTypeColor = (type: DataType): string => TYPE_COLOR_VALUES[type];

// Helper pro získání hlavní barvu
export const getMainColor = (): string => MAIN_COLOR;