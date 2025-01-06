// frontend\src\hooks\useTableData.tsx
import { useQuery } from '@apollo/client';
import { GET_TABLE_DATA } from '../graphql/queries/getTableData';
import { useState, useEffect } from 'react';
import { useFilters } from '../context/FiltersContext';

export function useTableData(limit: number = 50, initialPage: number = 1) {
  const [page, setPage] = useState(initialPage);
  const { dateRange, dataType } = useFilters();

  // Příprava proměnných pro filtrování
  const offset = (page - 1) * limit;
  const type = dataType === 'all' ? null : dataType;

  // Převod dat na ISO řetězec, pokud jsou vybrána
  const startDate = dateRange.type !== 'all' && dateRange.start 
    ? dateRange.start.toISOString() 
    : null;
  
  const endDate = dateRange.type !== 'all' && dateRange.end 
    ? dateRange.end.toISOString() 
    : null;

  const { data, loading, error } = useQuery(GET_TABLE_DATA, {
    variables: { 
      limit, 
      offset, 
      type, 
      startDate, 
      endDate 
    }
  });

  const totalCount = data?.messages?.messages?.totalCount || 0;
  const maxPages = Math.ceil(Math.min(totalCount, 500) / limit);

  return {
    data: data?.messages?.messages?.items || [],
    totalCount,
    hasMore: data?.messages?.messages?.hasMore || false,
    loading,
    error,
    page,
    totalPages: maxPages,
    setPage
  };
}