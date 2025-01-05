// components/dashboard/data/table/TablePagination.tsx
import React from 'react';

interface TablePaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange
}: TablePaginationProps) {
  const maxPages = Math.max(1, Math.ceil(Math.min(totalCount, 500) / pageSize));  // Ensure maxPages is at least 1

  const handlePrevClick = () => {
    console.log("Clicked 'Previous', current page:", currentPage);  // Log when 'Previous' is clicked
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    console.log("Clicked 'Next', current page:", currentPage);  // Log when 'Next' is clicked
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-between items-center py-4">
      <span className="text-gray-600">
        Strana {currentPage} z {maxPages}
      </span>
      <div className="space-x-2">
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Předchozí
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentPage === maxPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Další
        </button>
      </div>
    </div>
  );
}
