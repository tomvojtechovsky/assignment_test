// frontend/src/components/filters/global/DateRangeFilter.tsx
import React, { useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import { cs } from "date-fns/locale/cs";
import 'react-datepicker/dist/react-datepicker.css';
import { useFilters } from '../../../context/FiltersContext';
import { TimeFilterType } from '../../../context/FiltersContext';

// Registrace české lokalizace
registerLocale("cs", cs);

// Definice přednastavených časových intervalů
const timeIntervals = [
  { value: 'all', label: 'Vše' },
  { value: 'week', label: 'Poslední týden' },
  { value: 'month', label: 'Poslední měsíc' },
  { value: 'year', label: 'Poslední rok' },
  { value: 'custom', label: 'Vlastní období' }
];

export default function DateRangeFilter() {
  const { dateRange, setPresetRange, setCustomRange, resetDateRange } = useFilters();
  const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);
  const [isEndPickerOpen, setIsEndPickerOpen] = useState(false);

  // Výběr přednastavené periody
  const handleIntervalChange = (interval: TimeFilterType) => { // Změníme typ parametru
    if (interval === 'custom') {
      setPresetRange('custom');
    } else {
      setPresetRange(interval);
    }
  };

  // Handler pro výběr počátečního data
  const handleStartDateSelect = (date: Date | null) => {
    if (!date) return;
    setCustomRange(date, dateRange.end);
    setIsStartPickerOpen(false);
  };

  // Handler pro výběr koncového data
  const handleEndDateSelect = (date: Date | null) => {
    if (!date) return;
    setCustomRange(dateRange.start, date);
    setIsEndPickerOpen(false);
  };

  // Individuální mazání dat
  const handleClearDate = (type: 'start' | 'end') => {
    if (type === 'start') {
      setCustomRange(null, dateRange.end);
    } else {
      setCustomRange(dateRange.start, null);
    }
  };

  // Formátování data pro zobrazení
  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString('cs') : 'Vybrat';
  };

  return (
    <div className="flex flex-col space-y-1 sm:space-y-2">
      <span className="text-xs sm:text-sm font-medium text-gray-600">Časové období</span>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-start sm:items-center">
        {/* Dropdown pro přednastavené intervaly */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <select
            value={dateRange.type}
            onChange={(e) => handleIntervalChange(e.target.value as TimeFilterType)}
            className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm border border-gray-300"
          >
            {timeIntervals.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom date pickers */}
        {dateRange.type === 'custom' && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
            {/* Počáteční datum */}
            <div className="relative w-full">
              <button
                onClick={() => setIsStartPickerOpen(true)}
                className="w-full flex items-center justify-between space-x-2 px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                <span>Od: {formatDate(dateRange.start)}</span>
                {dateRange.start && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearDate('start');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </button>

              {isStartPickerOpen && (
                <div className="absolute z-50 mt-2">
                  <DatePicker
                    selected={dateRange.start}
                    onChange={handleStartDateSelect}
                    selectsStart
                    startDate={dateRange.start || undefined}
                    endDate={dateRange.end || undefined}
                    inline
                    locale="cs"
                    maxDate={new Date()}
                  />
                </div>
              )}
            </div>

            {/* Koncové datum */}
            <div className="relative w-full">
              <button
                onClick={() => setIsEndPickerOpen(true)}
                className="w-full flex items-center justify-between space-x-2 px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                <span>Do: {formatDate(dateRange.end)}</span>
                {dateRange.end && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearDate('end');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </button>

              {isEndPickerOpen && (
                <div className="absolute z-50 mt-2">
                  <DatePicker
                    selected={dateRange.end}
                    onChange={handleEndDateSelect}
                    selectsEnd
                    startDate={dateRange.start || undefined}
                    endDate={dateRange.end || undefined}
                    minDate={dateRange.start || undefined}
                    inline
                    locale="cs"
                    maxDate={new Date()}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {/* Reset tlačítko */}
        {dateRange.type !== 'all' && (
          <button
            onClick={() => resetDateRange()}
            className="w-full px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm text-gray-600 hover:bg-gray-100 border border-gray-300 whitespace-nowrap"
            title="Reset filtru"
          >
            Zrušit výběr ✕
          </button>
        )}
      </div>
    </div>
  );
}