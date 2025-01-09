import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CardStyled } from '../../dashboard/shared/Card';
import TypeFilter from './TypeFilter';
import DateRangeFilter from './DateRangeFilter';
import ThreatFilter from './ThreatFilter';

export default function GlobalFilters() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Mobilní tlačítko pro otevření filtru */}
      <div className="flex justify-end sm:hidden mb-2">
        <button
          className="p-2 bg-main/10 text-main border border-main/30 rounded-lg flex items-center space-x-2 hover:bg-main/20 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>Filtry</span>
        </button>
      </div>

      {/* Desktop verze filtru */}
      <CardStyled className="hidden sm:block bg-gray-200">
        <div className="space-y-2 sm:space-y-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
            <TypeFilter />
            <DateRangeFilter />
            <ThreatFilter />
          </div>
        </div>
      </CardStyled>

      {/* Mobilní modální okno */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-11/12 max-w-md rounded-lg p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filtry</h2>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsModalOpen(false)}
              >
                Zavřít
              </button>
            </div>

            <div className="space-y-4">
              <TypeFilter />
              <DateRangeFilter />
              <ThreatFilter />
            </div>
          </div>
        </div>
      )}
    </>
  );
}