// frontend\src\hooks\useMetrics.ts
import { useQuery } from '@apollo/client';
import { GET_METRICS } from '../graphql/queries/getMetrics';
import { useFilters } from '../context/FiltersContext';

export interface Metrics {
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
    const { dateRange, dataType } = useFilters();

    // Příprava proměnných pro filtrování
    const type = dataType === 'all' ? null : dataType;

    const startDate = dateRange.type !== 'all' && dateRange.start
        ? dateRange.start.toISOString()
        : null;

    const endDate = dateRange.type !== 'all' && dateRange.end
        ? dateRange.end.toISOString()
        : null;

    const { data, loading, error } = useQuery<MetricsResponse>(GET_METRICS, {
        variables: {
            type,
            startDate,
            endDate
        }
    });

    // Zjednodušení přístupu k metrikám
    const metrics = {
        total: data?.metrics?.totalCount || 0,
        syslogCount: data?.metrics?.syslogCount || 0,
        dataflowCount: data?.metrics?.dataflowCount || 0,
        threatsCount: data?.metrics?.threatsCount || 0,
        attacksByType: Object.entries(data?.metrics?.attacksByType || {}).reduce((acc, [attackType, count]) => {
            acc[attackType] = count;
            return acc;
        }, {} as Record<string, number>),
        last24hCount: data?.metrics?.last24hCount || 0
    };

    return { metrics, loading, error };
}