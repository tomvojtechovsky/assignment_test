// components/dashboard/data/table/TableRow.tsx
import { useState } from 'react';
import { Message } from '../../../../types/table';
import { useTypeColor } from '../../../../hooks/useTypeColor';
import TableRowDetail from './TableRowDetail';

interface TableRowProps {
  rowData: Message;
  index: number;
}

export default function TableRow({ rowData, index }: TableRowProps) {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const typeColors = useTypeColor(rowData.type);

  const toggleDetail = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  // Získání barev pro stav ohrožení
  const getRowClasses = () => {
    const baseClasses = 'cursor-pointer transition-colors duration-150';
    
    // Pokud je záznam rozkliknutý
    if (isDetailVisible) {
      return `${baseClasses} border-b-0 ${typeColors.getBgClass()}`;
    }
    
    // Pokud je hrozba
    if (rowData.threat) {
      return `${baseClasses} border-b border-red-200 bg-red-50 hover:bg-red-100`;
    }
    
    // Normální stav
    return `${baseClasses} hover:${typeColors.getBgClass()}`;
  };

  // Formátování data
  const formattedDate = new Date(rowData.timestamp).toLocaleString('cs-CZ');

  return (
    <>
      <tr onClick={toggleDetail} className={getRowClasses()}>
        <td className="px-4 py-2">{formattedDate}</td>
        <td className="px-4 py-2">{rowData.probeIp}</td>
        <td className="px-4 py-2">{rowData.probeName}</td>
        <td className="px-4 py-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm
            ${rowData.threat 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
            }`}>
            {rowData.threat ? 'Ano' : 'Ne'}
          </span>
        </td>
        <td className="px-4 py-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm
            ${typeColors.getButtonClasses(true)}`}>
            {rowData.type === 'syslog' ? 'Syslog' : 'Dataflow'}
          </span>
        </td>
      </tr>
      {isDetailVisible && (
        <TableRowDetail rowData={rowData} />
      )}
    </>
  );
}