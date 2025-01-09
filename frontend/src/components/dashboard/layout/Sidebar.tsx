import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartPie, 
  faDatabase, 
  faChartLine,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Přehled', icon: faChartPie },
    { path: '/dashboard/data', label: 'Data', icon: faDatabase },
    { path: '/dashboard/analytics', label: 'Analýzy', icon: faChartLine }
  ];

  return (
    <aside 
      className={`
        ${isExpanded ? 'w-64' : 'w-16'} 
        bg-white border-r border-gray-200 shadow-sm 
        transition-all duration-300 ease-in-out relative overflow-hidden
        flex flex-col
      `}
    >
      {/* Toggle button */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            p-2 rounded-full bg-gray-100 hover:bg-gray-200 
            transition-colors duration-200 flex items-center justify-center
            text-gray-600 hover:text-type-all
          "
        >
          <FontAwesomeIcon 
            icon={isExpanded ? faChevronLeft : faChevronRight} 
            className="w-3 h-3"
          />
        </button>
      </div>

      {/* Navigační menu */}
      <nav className="mt-16 flex-1">
        {navigationItems.map( (item, index) => (
          <Link
            key={`${item.path}-${index}`}
            to={item.path}
            className={`
              flex items-center px-4 py-3 transition-colors duration-200 group relative
              ${location.pathname === item.path 
                ? 'text-type-all bg-type-all/10 border-r-4 border-type-all' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
            `}
          >
            <div className="flex items-center w-full">
              <FontAwesomeIcon 
                icon={item.icon} 
                className={`w-5 h-5 mr-3
                  ${location.pathname === item.path 
                    ? 'text-type-all' 
                    : 'text-gray-400 group-hover:text-gray-600'}
                `}
              />
              <span 
                className={`
                  text-sm font-medium whitespace-nowrap
                  transition-all duration-300 ease-in-out
                  ${isExpanded 
                    ? 'opacity-100 translate-x-0 delay-200' 
                    : 'opacity-0 -translate-x-4 pointer-events-none'}
                `}
              >
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}