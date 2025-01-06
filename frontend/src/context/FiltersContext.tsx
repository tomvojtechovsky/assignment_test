// frontend/src/context/FiltersContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// Rozšířený typ pro časový interval
export type TimeFilterType = 'all' | 'week' | 'month' | 'year' | 'custom';

// Rozhraní pro datový rozsah
interface DateRange {
    type: TimeFilterType;
    start: Date | null;
    end: Date | null;
}

// Rozhraní pro kontext
export interface FiltersContextType {
    dateRange: DateRange;
    dataType: 'all' | 'syslog' | 'dataflow'; // Přidáme typ
    setPresetRange: (type: TimeFilterType) => void;
    setCustomRange: (start: Date | null, end: Date | null) => void;
    resetDateRange: () => void;
    setDataType: (type: 'all' | 'syslog' | 'dataflow') => void; // Přidáme setter
}

// Výchozí stav
const defaultDateRange: DateRange = {
    type: 'all',
    start: null,
    end: null
};

// Vytvoření kontextu
const FiltersContext = createContext<FiltersContextType | null>(null);

// Provider komponenta
export function FiltersProvider({ children }: { children: ReactNode }) {

    const [dataType, setDataType] = useState<'all' | 'syslog' | 'dataflow'>('all');
    const [dateRange, setDateRange] = useState<DateRange>({
        type: 'all',
        start: null,
        end: null
      });

      const setPresetRange = (type: TimeFilterType) => {
        const now = new Date();
    
        switch (type) {
          case 'all':
            // Explicitně nastavíme null hodnoty pro všechna data
            setDateRange({
              type: 'all',
              start: null,
              end: null
            });
            break;
          case 'week':
            setDateRange({
              type: 'week',
              start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
              end: now
            });
            break;
          case 'month':
            setDateRange({
              type: 'month',
              start: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
              end: now
            });
            break;
          case 'year':
            setDateRange({
              type: 'year',
              start: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
              end: now
            });
            break;
          case 'custom':
            setDateRange({
              type: 'custom',
              start: null,
              end: null
            });
            break;
        }
      };
    
      const setCustomRange = (start: Date | null, end: Date | null) => {
        setDateRange({
          type: 'custom',
          start,
          end
        });
      };
    
      const resetDateRange = () => {
        setDateRange({
          type: 'all',
          start: null,
          end: null
        });
      };

    return (
        <FiltersContext.Provider value={{
            dateRange,
            dataType,
            setPresetRange,
            setCustomRange,
            resetDateRange,
            setDataType // Přidáme setter
        }}>
            {children}
        </FiltersContext.Provider>
    );
}

// Custom hook pro používání kontextu
export function useFilters() {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error('useFilters must be used within a FiltersProvider');
    }
    return context;
}