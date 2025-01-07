// src/hooks/useTypeColor.ts

import { useMemo } from 'react';
import { DataType, TYPE_COLORS } from '../constants/colors';

interface TypeColorReturn {
  getButtonClasses: (isActive: boolean) => string;
  getChartColor: () => string;
  getBgClass: () => string;  // Přidáno
}

export function useTypeColor(type: DataType): TypeColorReturn {
  return useMemo(() => ({
    // Vrátí kompletní Tailwind třídy pro tlačítko
    getButtonClasses: (isActive: boolean) => {
      return isActive 
        ? TYPE_COLORS[type].button.active 
        : TYPE_COLORS[type].button.inactive;
    },
    
    // Vrátí HEX barvu pro graf
    getChartColor: () => TYPE_COLORS[type].chart,

    // Vrátí třídu pro pozadí
    getBgClass: () => `bg-type-${type}/10 hover:bg-type-${type}/20`
  }), [type]);
}