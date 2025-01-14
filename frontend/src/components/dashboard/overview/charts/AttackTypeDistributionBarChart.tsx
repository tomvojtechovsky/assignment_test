import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useFilters } from '../../../../context/FiltersContext';
import { useAttackTypeDistributionData } from '../../../../hooks/useAttackTypeDistributionData';
import { getAttackTypeColor } from '../../../../constants/colors';
import DistributionLegend from './distributionChart/DistributionLegend';

// Registrace komponent pro Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AttackTypeDistributionBarChart() {
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

    // Příprava dat pro Bar Chart
    const chartData = {
        labels: data.map((item) => item.attackType),  // Label pro každý sloupec
        datasets: [
            {
                label: 'Počet útoků',  // Popis datasetu
                data: data.map((item) => item.count),  // Počty útoků
                backgroundColor: data.map((item) => getAttackTypeColor(item.attackType)),  // Barvy podle typu útoku
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-1 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Distribuce síťových hrozeb
                    </h2>
                    <div className="flex-grow">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: {
                                        callbacks: {
                                            label: (tooltipItem) => `Počet útoků: ${tooltipItem.raw}`
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <DistributionLegend data={data} />
                </div>
            </div>
        </div>
    );
}
