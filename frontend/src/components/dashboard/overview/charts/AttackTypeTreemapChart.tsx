import React from 'react';
import { useAttackTypeDistributionData } from '../../../../hooks/useAttackTypeDistributionData';
import { getAttackTypeColor } from '../../../../constants/colors';
import { ResponsiveContainer, Treemap, Tooltip, Legend } from 'recharts';
import { useFilters } from '../../../../context/FiltersContext';

export default function AttackTypeTreemapChart() {
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

    console.log(data);

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

    const CustomCellRenderer = (props: any) => {
        const { x, y, width, height, payload } = props;
    
        // Získáme hodnotu 'attackType' přímo z payload
        const name = payload?.attackType || 'unknown';  // Pokud není 'attackType', použije se 'unknown'
        const color = getAttackTypeColor(name); // Získání barvy na základě attackType
        console.log("name: ", name, "color: ", color);  // Logování pro kontrolu
    
        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: color,
                        stroke: '#fff',
                        strokeWidth: 2,
                    }}
                />
                {width > 20 && height > 20 && (
                    <text
                        x={x + width / 2}
                        y={y + height / 2}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={14}
                    >
                        {name}
                    </text>
                )}
            </g>
        );
    };
    

    return (
        <div className="w-full h-[400px] bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-700">Distribuce typů útoků (TreeMap)</h3>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <Treemap
                    data={data}
                    dataKey="count"
                    nameKey="attackType"  // Toto zajistí, že name bude odpovídat hodnotám attackType
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    content={<CustomCellRenderer />}
                >
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        payload={data.map(item => ({
                            value: item.attackType,  // Zajišťujeme, že value je správný typ útoku
                            type: 'rect',
                            color: getAttackTypeColor(item.attackType)
                        }))}
                    />
                </Treemap>
            </ResponsiveContainer>
        </div>
    );
}
