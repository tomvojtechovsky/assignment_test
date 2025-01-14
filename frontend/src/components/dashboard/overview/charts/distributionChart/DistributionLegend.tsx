import React from 'react';
import { DistributionLegendProps } from '../../../../../types/distributionChart';
import { getAttackTypeColor } from '../../../../../constants/colors';

export default function DistributionLegend({
    data,
    activeAttackType,
    onMouseEnter,
    onMouseLeave
}: DistributionLegendProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {data.map((item) => (
                <div 
                    key={item.attackType}
                    className={`
                        bg-gray-50 rounded-lg p-4 flex items-start space-x-4 
                        transition-all duration-300
                        border border-gray-200
                    `}
                    style={{
                        borderColor: activeAttackType === item.attackType 
                            ? getAttackTypeColor(item.attackType)
                            : undefined,
                        backgroundColor: activeAttackType === item.attackType 
                            ? `${getAttackTypeColor(item.attackType)}20`  // 10% opacity pozadí
                            : undefined
                    }}
                    onMouseEnter={() => onMouseEnter?.(item.attackType)}
                    onMouseLeave={onMouseLeave}
                >
                    <div 
                        className="w-8 h-8 rounded-full flex-shrink-0" 
                        style={{ 
                            backgroundColor: getAttackTypeColor(item.attackType),
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }} 
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold capitalize">
                                {item.attackType}
                            </h3>
                            <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                                {item.count}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
     );
}