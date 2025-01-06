// components/dashboard/data/table/DataTable.tsx
import { useState } from 'react';
import {Card} from '../../shared/Card';
import TableRow from './TableRow';

interface DataTableProps {
 data: any[];  // Later we'll use a more specific type
 loading: boolean;
}

export default function DataTable({ data, loading }: DataTableProps) {
 const [visibleColumns] = useState<(keyof typeof columnHeaders)[]>([
   'timestamp', 
   'probeIp', 
   'probeName', 
   'threat', 
   'type'
 ]);

 const columnHeaders = {
   timestamp: 'Čas',
   probeIp: 'IP Sondy',
   probeName: 'Název Sondy',
   threat: 'Hrozba',
   type: 'Typ'
 };

 if (loading) return <div>Načítání...</div>;

 return (
   <Card className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
         <tr>
           {visibleColumns.map((column) => (
             <th
               key={column}
               className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
             >
               {columnHeaders[column]}
             </th>
           ))}
         </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
         {data.map((row, index) => (
           <TableRow 
             key={index} 
             rowData={row} 
             index={index} 
           />
         ))}
       </tbody>
     </table>
   </Card>
 );
}