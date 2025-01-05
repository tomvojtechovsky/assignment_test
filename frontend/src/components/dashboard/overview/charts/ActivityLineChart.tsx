// frontend/src/components/dashboard/overview/charts/ActivityLineChart.tsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useActivityData } from '../../../../hooks/useActivityData';

type TimePeriod = 'week' | 'month' | 'year';

export default function ActivityLineChart() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
  const { data, loading, error } = useActivityData(timePeriod);

  // Přidáme useEffect pro ladění
  useEffect(() => {
    console.log('ActivityLineChart - data:', data);
    console.log('ActivityLineChart - loading:', loading);
    console.log('ActivityLineChart - error:', error);
  }, [data, loading, error]);

  const periodLabels = {
    week: 'Poslední týden',
    month: 'Poslední měsíc',
    year: 'Poslední rok'
  };

  if (loading) return <div>Načítání...</div>;
  if (error) return <div>Chyba: {error.message}</div>;

  // Přidáme kontrolu dat před renderováním
  if (!data || data.length === 0) {
    return <div>Žádná data k zobrazení</div>;
  }

  return (
    <div className="w-full h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Aktivita systému</h3>
        <div className="flex space-x-2">
          {(Object.keys(periodLabels) as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`
                px-3 py-1 rounded-full text-sm
                ${timePeriod === period 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="label" 
            axisLine={{ stroke: '#a0a0a0' }}
            tickLine={{ stroke: '#a0a0a0' }}
          />
          <YAxis 
            axisLine={{ stroke: '#a0a0a0' }}
            tickLine={{ stroke: '#a0a0a0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#f9f9f9', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 5, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
            activeDot={{ r: 8, fill: '#2563eb', stroke: 'white', strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}