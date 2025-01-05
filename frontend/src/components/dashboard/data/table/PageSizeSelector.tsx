import React from 'react';

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, onPageSizeChange }) => {
  return (
    <div>
      <label htmlFor="pageSize" className="mr-2">Počet řádek na stránce:</label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border px-2 py-1 rounded"
      >
        <option value={15}>15</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default PageSizeSelector;
