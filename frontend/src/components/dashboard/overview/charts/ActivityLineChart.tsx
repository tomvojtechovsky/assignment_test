// frontend/src/components/dashboard/overview/charts/ActivityChart.tsx
import React, { useMemo } from 'react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { useActivityData } from '../../../../hooks/useActivityData';
import { useFilters } from '../../../../context/FiltersContext';
import { useTypeColor } from '../../../../hooks/useTypeColor';

export default function ActivityChart() {
    const { dateRange, dataType } = useFilters();
    const typeColors = useTypeColor(dataType);  // Získáme barvy podle aktuálního typu

    const { data, loading, error, isEmpty } = useActivityData(
        dateRange.type,
        dateRange.type === 'custom' ? dateRange.start : null,
        dateRange.type === 'custom' ? dateRange.end : null,
        dataType
    );

    // Vypočítáme kumulativní data a trend
    const enrichedData = useMemo(() => {
        if (!data) return [];

        let cumulative = 0;
        let prevCount = 0;

        return data.map((item, index) => {
            cumulative += item.count;
            const trend = index > 0 ? item.count - prevCount : 0;
            prevCount = item.count;

            return {
                ...item,
                cumulative,
                trend
            };
        });
    }, [data]);

    // Vypočítáme průměrnou aktivitu
    const averageStats = useMemo(() => {
        if (!enrichedData.length) return { value: 0, text: 'útoků za den' };
        const totalAttacks = enrichedData.reduce((sum, item) => sum + item.count, 0);
        switch (dateRange.type) {
            case 'all':
                return { value: 0, text: 'útoků za den' };
            case 'week':
                return {
                    value: Math.round(totalAttacks / 7),
                    text: 'útoků za den'
                };
            case 'month':
                return {
                    value: Math.round(totalAttacks / 30),
                    text: 'útoků za den'
                };
            case 'year':
                return {
                    value: Math.round(totalAttacks / 52),
                    text: 'útoků za týden'
                };
            case 'custom':
                if (!dateRange.start || !dateRange.end) return { value: 0, text: 'útoků za den' };
                const days = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
                return {
                    value: Math.round(totalAttacks / Math.max(1, days)),
                    text: 'útoků za den'
                };
        }
        return { value: 0, text: 'útoků za den' };
    }, [enrichedData, dateRange]);

    if (loading) return (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="text-gray-500">Načítání dat...</div>
        </div>
    );

    if (error) return (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="text-red-500">Chyba při načítání: {error.message}</div>
        </div>
    );

    if (isEmpty) return (
        <div className="w-full h-[400px] flex items-center justify-center">
            <div className="text-gray-500">Žádná data k zobrazení</div>
        </div>
    );

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload) return null;

        return (
            <div className="bg-white p-4 shadow-lg border rounded-lg">
                <p className="font-semibold mb-2">{label}</p>
                <div className="space-y-1">
                    <p className={`text-[${typeColors.getChartColor()}]`}>
                        Počet útoků: {payload[0]?.value || 0}
                    </p>
                    <p className="text-gray-600">
                        Celkem útoků: {payload[1]?.value || 0}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                <div className="space-y-1 text-center sm:text-left w-full">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-700">Aktivita systému</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm">
                        <span className="font-medium text-gray-600">
                            Průměrně {averageStats.value} {averageStats.text}
                        </span>
                        {dataType !== 'all' && (
                            <span className="text-gray-500">
                                ({dataType === 'syslog' ? 'Syslog' : 'Dataflow'} záznamy)
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <ComposedChart data={enrichedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="label"
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                        tick={{ fill: '#6b7280' }}
                    />
                    <YAxis
                        yAxisId="left"
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                        tick={{ fill: '#6b7280' }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                        tick={{ fill: '#6b7280' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        yAxisId="left"
                        dataKey="count"
                        fill={typeColors.getChartColor()}  // Použití dynamické barvy
                        name="Počet útoků"
                        radius={[4, 4, 0, 0]}
                    />
                    <Line
                        yAxisId="right"
                        type="stepAfter"
                        dataKey="cumulative"
                        stroke="#666666"  // Ponecháme neutrální barvu pro kumulativní data
                        strokeWidth={2}
                        name="Celkem útoků"
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}