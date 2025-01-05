// context/FiltersContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { DataType } from '../components/filters/global/types/filters';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface FiltersContextType {
  dataType: DataType;
  setDataType: (type: DataType) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [dataType, setDataType] = useState<DataType>('all');
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null
  });

  return (
    <FiltersContext.Provider value={{ 
      dataType, 
      setDataType,
      dateRange,
      setDateRange 
    }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return context;
}