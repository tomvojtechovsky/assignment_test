import React, { useState } from 'react';
import { useFilters } from '../../../../../context/FiltersContext';
import { useAttackTypeDistributionData } from '../../../../../hooks/useAttackTypeDistributionData';
import BarChart from './BarCart';
import DistributionLegend from './DistributionLegend';

export default function AttackTypeDistributionBarChart() {
    const { dateRange, dataType, threat } = useFilters();
    const [activeAttackType, setActiveAttackType] = useState<string | null>(null);

    const { data, loading, error, isEmpty } = useAttackTypeDistributionData(
        dateRange.type === 'custom' ? dateRange.start : null,
        dateRange.type === 'custom' ? dateRange.end : null,
        dataType,
        threat
    );

    const handleMouseEnter = (attackType: string) => {
        setActiveAttackType(attackType);
    };

    const handleMouseLeave = () => {
        setActiveAttackType(null);
    };

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

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-1 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Distribuce síťových hrozeb
                    </h2>
                    <div className="flex-grow">
                        <BarChart
                            data={data}
                            activeAttackType={activeAttackType}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <DistributionLegend
                        data={data}
                        activeAttackType={activeAttackType}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            </div>
        </div>
    );
}