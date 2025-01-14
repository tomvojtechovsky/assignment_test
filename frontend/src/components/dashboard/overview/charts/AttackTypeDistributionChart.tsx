import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { useFilters } from '../../../../context/FiltersContext';
import { useAttackTypeDistributionData } from '../../../../hooks/useAttackTypeDistributionData';
import { getAttackTypeColor } from '../../../../constants/colors';

export default function AttackTypeDistributionChart() {
    const { dateRange, dataType, threat } = useFilters();

    const { data, loading, error, isEmpty } = useAttackTypeDistributionData(
        dateRange.type === 'custom' ? dateRange.start : null,
        dateRange.type === 'custom' ? dateRange.end : null,
        dataType,
        threat
    );

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

    const CustomTooltip = ({ active, payload }: any) => {
        if (!active || !payload) return null;

        return (
            <div className="bg-white p-4 shadow-lg border rounded-lg">
                <p className="font-semibold mb-2">{payload[0]?.payload?.attackType}</p>
                <p className="text-gray-600">
                    Počet: {payload[0]?.value}
                </p>
            </div>
        );
    };

    return (
        <div className="w-full h-[400px] bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-700">Distribuce typů útoků</h3>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="attack_type"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={5}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getAttackTypeColor(entry.attackType)}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        payload={data.map(item => ({
                            value: item.attackType,
                            type: 'rect',
                            color: getAttackTypeColor(item.attackType)
                        }))}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}