// components/dashboard/data/table/TableRow.tsx
import { useState } from 'react';
import TableRowDetail from './TableRowDetail';

interface TableRowProps {
 rowData: any;  // Později zpřesníme typ
 index: number;
}

export default function TableRow({ rowData, index }: TableRowProps) {
 const [isDetailVisible, setIsDetailVisible] = useState(false);

 const toggleDetail = () => {
   setIsDetailVisible(!isDetailVisible);
 };

 return (
   <>
     <tr 
       onClick={toggleDetail}
       className={`
         cursor-pointer 
         ${rowData.threat ? 'bg-red-50' : 'hover:bg-gray-100'}
         ${isDetailVisible ? 'border-b-0' : ''}
       `}
     >
       <td className="px-4 py-2">{rowData.timestamp}</td>
       <td className="px-4 py-2">{rowData.probeIp}</td>
       <td className="px-4 py-2">{rowData.probeName}</td>
       <td className="px-4 py-2">
         {rowData.threat ? 'Ano' : 'Ne'}
       </td>
       <td className="px-4 py-2">{rowData.type}</td>
     </tr>
     {isDetailVisible && (
       <TableRowDetail rowData={rowData} />
     )}
   </>
 );
}