// frontend/src/hooks/useActivityData.ts
import { useQuery } from '@apollo/client';
import { GET_ACTIVITY_DATA } from '../graphql/queries/getActivityData';
import { useState, useEffect } from 'react';

// Typy a rozhraní
interface ActivityDataPoint {
  label: string;
  count: number;
}

interface ActivityDataResponse {
  activityData: ActivityDataPoint[]; // GraphQL vrací camelCase
}

export type TimePeriod = 'week' | 'month' | 'year';

// Hook pro získání dat o aktivitě
export function useActivityData(timePeriod: TimePeriod) {
  const { data, loading, error } = useQuery<ActivityDataResponse>(GET_ACTIVITY_DATA, {
    variables: { period: timePeriod },
    // Polling pro aktuální data každých 30 sekund
    pollInterval: 30000,
  });

  const [processedData, setProcessedData] = useState<ActivityDataPoint[]>([]);

  useEffect(() => {
    if (data?.activityData) {
      setProcessedData(data.activityData);
    }
  }, [data]);

  return {
    data: processedData,
    loading,
    error,
    isEmpty: !loading && (!processedData || processedData.length === 0)
  };
}