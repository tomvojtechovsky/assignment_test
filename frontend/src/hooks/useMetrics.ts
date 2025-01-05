// hooks/useMetrics.ts
import { useQuery } from '@apollo/client';
import { GET_METRICS } from '../graphql/queries/getMetrics';
import { useFilters } from '../context/FiltersContext';

interface Metrics {
totalCount: number;
syslogCount: number;
dataflowCount: number;
threatsCount: number;
attacksByType: Record<string, number>;
last24hCount: number;
}

interface MetricsResponse {
metrics: Metrics;
}

export function useMetrics() {
const { dataType, dateRange } = useFilters();

const { data, loading, error } = useQuery<MetricsResponse>(GET_METRICS, {
  variables: {
    type: dataType === 'all' ? null : dataType,
    startDate: dateRange.start ? dateRange.start.toISOString() : null,
    endDate: dateRange.end ? dateRange.end.toISOString() : null
  }
});

// Zjednodušení přístupu k metrikám
const metrics = {
  total: data?.metrics?.totalCount || 0,
  syslogCount: data?.metrics?.syslogCount || 0,
  dataflowCount: data?.metrics?.dataflowCount || 0,
  threatsCount: data?.metrics?.threatsCount || 0,
  attacksByType: data?.metrics?.attacksByType || {},
  last24hCount: data?.metrics?.last24hCount || 0
};

return { metrics, loading, error };
}