// frontend/src/hooks/useActivityData.ts
import { useQuery } from '@apollo/client';
import { GET_ACTIVITY_DATA } from '../graphql/queries/getActivityData';
import { TimeFilterType } from '../context/FiltersContext';
import { DataType } from '../components/filters/global/types/filters';

interface ActivityDataPoint {
  label: string;
  count: number;
}

// interface ActivityDataResponse {
//   activityData: ActivityDataPoint[];
// }

export function useActivityData(
  period: TimeFilterType, 
  startDate: Date | null = null, 
  endDate: Date | null = null,
  type: DataType = 'all',
  threat: boolean | null = null
) {

  const { data, loading, error } = useQuery<{ activityData: ActivityDataPoint[] }>(GET_ACTIVITY_DATA, {
    variables: {
      period,
      startDate: period === 'all' ? null : (period === 'custom' && startDate ? startDate.toISOString() : null),
      endDate: period === 'all' ? null : (period === 'custom' && endDate ? endDate.toISOString() : null),
      type: type === 'all' ? null : type,
      threat
    },
  });

  return {
    data: data?.activityData || [],
    loading,
    error,
    isEmpty: !loading && (!data?.activityData || data.activityData.length === 0)
  };
}