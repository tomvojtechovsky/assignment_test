// frontend\src\components\dashboard\data\DataPage.tsx
import { useState, useEffect } from 'react';
import {Card} from '../shared/Card';
import { useTableData } from '../../../hooks/useTableData';
import { useFilters } from '../../../context/FiltersContext';
import DataTable from './table/DataTable';
import TablePagination from './table/TablePagination';

export default function DataPage() {
  const [page, setPage] = useState(1);
  const { dataType, dateRange } = useFilters();

  const {
    data,
    totalCount,
    loading,
    error,
    page: currentPage,
    totalPages,
    setPage: setQueryPage
  } = useTableData(15, page);

  // Funkce pro změnu stránky
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      setQueryPage(newPage);
    }
  };

  // Reset stránky při změně filtrů
  useEffect(() => {
    setPage(1);
  }, [dataType, dateRange]);

  return (
    <div className="space-y-6 mt-4">
      <Card>
        
        {loading && <div>Načítání...</div>}
        {error && <div className="text-red-500">Chyba: {error.message}</div>}

        <DataTable data={data} loading={loading} />

        {data.length === 0 && !loading && (
          <div className="text-gray-500">Žádná data k zobrazení</div>
        )}

        <TablePagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={15}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
}