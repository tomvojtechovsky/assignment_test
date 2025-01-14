import React from 'react';
import { useFilters } from '../../../context/FiltersContext';

export default function ThreatFilter() {
  const { threat, setThreatFilter } = useFilters();

  const handleClick = () => {
    let val = threat === true ? null : true;
    setThreatFilter( val );
  };

  return (
    <div className="flex flex-col space-y-1 sm:space-y-2">
      <span className="text-xs sm:text-sm font-medium text-gray-600">Hrozby</span>
      <div className="flex items-center">
        <button
          onClick={handleClick}
          className={`
            px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all
            flex items-center space-x-2
            ${threat === true 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          <svg 
            className={`h-4 w-4 ${threat === true ? 'text-red-600' : 'text-gray-500'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 1.944l6.857 3.429v6.857a6.857 6.857 0 01-3.428 5.942L10 20l-3.429-1.828a6.857 6.857 0 01-3.428-5.942V5.373L10 1.944zm0 2.83L5 7.259v4.971a5 5 0 002.5 4.33L10 17.5l2.5-.94a5 5 0 002.5-4.33V7.26L10 4.774z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>Pouze hrozby</span>
        </button>
      </div>
    </div>
  );
}