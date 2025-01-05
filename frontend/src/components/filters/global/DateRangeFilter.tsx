import React, { useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import { cs } from "date-fns/locale/cs"; // the locale you want
registerLocale("el", cs); // register it with the name you want
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarContainer } from 'react-datepicker';
import { useFilters } from '../../../context/FiltersContext';

export default function DateRangeFilter() {
    const { dateRange, setDateRange } = useFilters();
    const [isOpen, setIsOpen] = useState(false);

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setDateRange({ start, end });

        // Zavřít kalendář, pokud jsou vybrány obě datum
        if (start && end) {
            setIsOpen(false);
        }
    };

    const formatDateDisplay = (date: Date | null) => {
        return date ? date.toLocaleDateString() : 'Vybrat';
    };

    const clearDates = () => {
        setDateRange({ start: null, end: null });
        setIsOpen(false);
    };

    const MyContainer = ({ className, children }: { className?: string; children: React.ReactNode }) => {
        return (
            <div style={{ padding: "16px", background: "#eee", display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #aeaeae" }}>
                <CalendarContainer className={className}>
                    <div>
                        <div style={{ position: "relative" }}>{children}</div>
                    </div>

                </CalendarContainer>
                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-2 px-3 py-1 rounded-full text-sm font-medium border border-gray-600 text-gray-600 hover:bg-gray-100 transition-all"
                >
                    Zavřít
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-600">Čas</span>
            <div className="relative">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
              px-3 py-1 rounded-full text-sm font-medium transition-all
              ${dateRange.start ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
                    >
                        Od: {formatDateDisplay(dateRange.start)}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
              px-3 py-1 rounded-full text-sm font-medium transition-all
              ${dateRange.end ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
                    >
                        Do: {formatDateDisplay(dateRange.end)}
                    </button>
                    {(dateRange.start || dateRange.end) && (
                        <button
                            onClick={clearDates}
                            className="px-3 py-1 rounded-full text-sm font-medium border border-red-600 text-red-600 hover:bg-red-100 transition-all"
                        >
                            Zrušit
                        </button>
                    )}
                </div>
                {isOpen && (
                    <div className="absolute z-10 mt-2" style={{ width: 'max-content' }}>
                        <DatePicker
                            showIcon
                            selected={dateRange.start || undefined}
                            onChange={handleDateChange}
                            startDate={dateRange.start || undefined}
                            endDate={dateRange.end || undefined}
                            selectsRange
                            inline
                            locale={cs}
                            calendarContainer={MyContainer}
                            isClearable
                            dateFormat="Pp"
                        />

                    </div>
                )}
            </div>
        </div>
    );
}