// hooks/useTableData.ts
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TABLE_DATA } from '../graphql/queries/getTableData';
import { DataType } from '../components/filters/global/types/filters';

interface DateRange {
 start: Date | null;
 end: Date | null;
}

export function useTableData(
 limit: number = 15, 
 initialPage: number = 1, 
 dataType: DataType = 'all', 
 dateRange: DateRange = { start: null, end: null }
) {
  const [page, setPage] = useState(initialPage);

  // Výpočet offsetu
  const offset = (page - 1) * limit;

  // Příprava proměnných pro filtrování
  const type = dataType === 'all' ? null : dataType;
  const startDate = dateRange.start ? dateRange.start.toISOString() : null;
  const endDate = dateRange.end ? dateRange.end.toISOString() : null;

  const { data, loading, error } = useQuery(GET_TABLE_DATA, {
      variables: {
          limit,
          offset,
          type,
          startDate,
          endDate
      },
      onCompleted: (data) => {
          console.log('Data received from query:', data);
      },
      fetchPolicy: 'network-only',
  });

  const totalCount = data?.messages?.messages?.totalCount || 0;
  const maxPages = Math.ceil(Math.min(totalCount, 500) / limit);

  return {
      data: data?.messages?.messages?.items || [],
      totalCount: Math.min(totalCount, 500),
      hasMore: data?.messages?.messages?.hasMore || false,
      loading,
      error,
      page,
      totalPages: maxPages,
      setPage
  };
}