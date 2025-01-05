import React, { useState, useMemo } from 'react';
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
import { useActivityData, TimePeriod } from '../../../../hooks/useActivityData';

const periodLabels: Record<TimePeriod, string> = {
 week: 'Poslední týden',
 month: 'Poslední měsíc',
 year: 'Poslední rok'
};

export default function ActivityChart() {
 const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
 const { data, loading, error, isEmpty } = useActivityData(timePeriod);

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
   if (!enrichedData.length) return { value: 0, text: '' };
   
   const totalAttacks = enrichedData.reduce((sum, item) => sum + item.count, 0);
   
   switch (timePeriod) {
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
   }
 }, [enrichedData, timePeriod]);

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
   
   const count = payload[0]?.value || 0;
   const cumulative = payload[1]?.value || 0;
   
   return (
     <div className="bg-white p-4 shadow-lg border rounded-lg">
       <p className="font-semibold mb-2">{label}</p>
       <div className="space-y-1">
         <p className="text-blue-600">Počet útoků: {count}</p>
         <p className="text-emerald-600">Celkem útoků: {cumulative}</p>
       </div>
     </div>
   );
 };

 return (
   <div className="w-full h-[400px] bg-white p-6 rounded-lg shadow-sm">
     <div className="flex justify-between items-center mb-6">
       <div className="space-y-1">
         <h3 className="text-lg font-semibold text-gray-700">Aktivita systému</h3>
         <div className="flex items-center space-x-2 text-sm">
           <span className="font-medium text-gray-600">
             Průměrně {averageStats.value} {averageStats.text}
           </span>
         </div>
       </div>
       <div className="flex space-x-2">
         {(Object.keys(periodLabels) as TimePeriod[]).map((period) => (
           <button
             key={period}
             onClick={() => setTimePeriod(period)}
             className={`
               px-4 py-2 rounded-lg text-sm font-medium transition-all
               ${timePeriod === period 
                 ? 'bg-blue-500 text-white shadow-sm' 
                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
             `}
           >
             {periodLabels[period]}
           </button>
         ))}
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
           fill="#3b82f6" 
           name="Počet útoků"
           radius={[4, 4, 0, 0]}
         />
         <Line
           yAxisId="right"
           type="stepAfter"
           dataKey="cumulative"
           stroke="#10b981"
           strokeWidth={2}
           name="Celkem útoků"
           dot={false}
         />
       </ComposedChart>
     </ResponsiveContainer>
   </div>
 );
}