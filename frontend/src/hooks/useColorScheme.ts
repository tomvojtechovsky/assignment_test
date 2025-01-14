// hooks/useColorScheme.ts

import { useMemo } from 'react';
import { ColorType, TYPE_COLORS, ColorScheme } from '../constants/colors';

export function useColorScheme(type: ColorType): ColorScheme {
    return useMemo(() => {
      return TYPE_COLORS[type];  // Změněno z COLOR_SCHEMES
    }, [type]);
   }

