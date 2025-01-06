// components/dashboard/data/table/TableRowDetail.tsx
import { useMemo } from 'react';
import {Card} from '../../shared/Card';

interface TableRowDetailProps {
 rowData: any;  // Later we'll use a more specific type
}

export default function TableRowDetail({ rowData }: TableRowDetailProps) {
 // Dynamicky generované pole detailů
 const detailFields = useMemo(() => {
   const baseFields = [
     { label: 'Čas', value: rowData.timestamp },
     { label: 'IP Sondy', value: rowData.probeIp },
     { label: 'Název Sondy', value: rowData.probeName },
     { label: 'Obsah', value: rowData.content },
     { label: 'Hrozba', value: rowData.threat ? 'Ano' : 'Ne' },
     { label: 'Typ', value: rowData.type },
     { label: 'Typ útoku', value: rowData.attackType }
   ];

   // Přidání specifických polí pro dataflow typ
   if (rowData.type === 'dataflow') {
     baseFields.push(
       { label: 'Zdrojová IP', value: rowData.sourceIp },
       { label: 'Zdrojový port', value: rowData.sourcePort },
       { label: 'Cílová IP', value: rowData.targetIp },
       { label: 'Cílový port', value: rowData.targetPort }
     );
   }

   return baseFields;
 }, [rowData]);

 return (
   <tr>
     <td colSpan={5}>
       <Card className="bg-gray-50">
         <div className="grid grid-cols-2 gap-4">
           {detailFields.map((field, index) => (
             <div key={index} className="py-2">
               <span className="font-semibold text-gray-600 mr-2">
                 {field.label}:
               </span>
               <span className="text-gray-900">
                 {field.value}
               </span>
             </div>
           ))}
         </div>
       </Card>
     </td>
   </tr>
 );
}