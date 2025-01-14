import React from 'react';
import { useFilters } from '../../../../context/FiltersContext';
import { useAttackTypeDistributionData } from '../../../../hooks/useAttackTypeDistributionData';
import { getAttackTypeColor } from '../../../../constants/colors';

export default function AttackTypeWaffleChart() {
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

    // Spočítáme celkový počet útoků
    const totalAttacks = data.reduce((sum, item) => sum + item.count, 0);

    // Přepočet na procenta pro 100 políček
    const waffleData = data.map(item => ({
        ...item,
        percentage: Math.round((item.count / totalAttacks) * 100)
    })).sort((a, b) => b.percentage - a.percentage);

    return (
        <div className="w-full h-[400px] bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-700">Distribuce typů útoků (Waffle Chart)</h3>
                </div>
            </div>

            <div className="flex">
                <div className="grid grid-cols-10 gap-1 mr-4">
                    {Array.from({ length: 100 }).map((_, index) => {
                        let color = '#e0e0e0'; // Výchozí šedá barva
                        let currentIndex = 0;

                        for (const type of waffleData) {
                            if (index < currentIndex + type.percentage) {
                                color = getAttackTypeColor(type.attackType);
                                break;
                            }
                            currentIndex += type.percentage;
                        }

                        return (
                            <div 
                                key={index} 
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: color }}
                            />
                        );
                    })}
                </div>

                <div className="flex flex-col">
                    {waffleData.map(item => (
                        <div key={item.attackType} className="flex items-center mb-1">
                            <div 
                                className="w-4 h-4 rounded mr-2" 
                                style={{ backgroundColor: getAttackTypeColor(item.attackType) }}
                            />
                            <span className="text-sm">
                                {item.attackType} ({item.percentage}%)
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}