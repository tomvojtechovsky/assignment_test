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
    <div className="flex flex-col space-y-2">
      <span className="text-sm font-medium text-gray-600">Časové období</span>
      <div className="flex space-x-2 items-center">
        {/* Dropdown pro přednastavené intervaly */}
        <div className="flex items-center space-x-2">
          <select
            value={dateRange.type}
            onChange={(e) => handleIntervalChange(e.target.value as TimeFilterType)}
            className="px-3 py-1 rounded-lg text-sm border border-gray-300"
          >
            {timeIntervals.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {/* Reset tlačítko */}
          {dateRange.type !== 'all' && (
            <button
              onClick={() => resetDateRange()}
              className="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-100 border border-gray-300"
              title="Reset filtru"
            >
              Zrušit výběr ✕
            </button>
          )}
        </div>

        {/* Datové pole pro počáteční datum */}
        {dateRange.type === 'custom' && (
          <div className="relative">
            <button
              onClick={() => setIsStartPickerOpen(true)}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all"
            >
              <span>Od: {formatDate(dateRange.start)}</span>
              {dateRange.start && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearDate('start');
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600"
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
        )}

        {/* Datové pole pro koncové datum */}
        {dateRange.type === 'custom' && (
          <div className="relative">
            <button
              onClick={() => setIsEndPickerOpen(true)}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all"
            >
              <span>Do: {formatDate(dateRange.end)}</span>
              {dateRange.end && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearDate('end');
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600"
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
        )}
      </div>
    </div>
  );
}