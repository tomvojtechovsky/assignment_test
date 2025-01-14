import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getAttackTypeColor } from '../../../../../constants/colors';
import { BarChartProps } from '../../../../../types/distributionChart';

// Registrace komponent pro Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ 
    data, 
    activeAttackType, 
    onMouseEnter, 
    onMouseLeave 
}: BarChartProps) {
    // Příprava dat pro Bar Chart
    const chartData = {
        labels: data.map((item) => item.attackType),
        datasets: [
            {
                label: 'Počet útoků',
                data: data.map((item) => item.count),
                backgroundColor: data.map((item) => 
                    activeAttackType && activeAttackType !== item.attackType 
                        ? `${getAttackTypeColor(item.attackType)}50`  // Průhledná varianta
                        : getAttackTypeColor(item.attackType)
                ),
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <Bar
            data={chartData}
            options={{
                onHover: (_, elements) => {
                    if (elements.length > 0) {
                        const dataIndex = elements[0].index;
                        const attackType = data[dataIndex].attackType;
                        onMouseEnter(attackType);
                    } else {
                        onMouseLeave();
                    }
                },
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
    );
}