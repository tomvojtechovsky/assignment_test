// components/filters/global/TypeFilter.tsx
import { useFilters } from '../../../context/FiltersContext';
import { useTypeColor } from '../../../hooks/useTypeColor';
import { DataType } from '../../../constants/colors';

export default function TypeFilter() {
  const { dataType, setDataType } = useFilters();
  
  // Získáme barevné třídy pro každý typ
  const allColors = useTypeColor('all');
  const syslogColors = useTypeColor('syslog');
  const dataflowColors = useTypeColor('dataflow');

  // Pomocná funkce pro získání správných barev podle typu
  const getColorForType = (type: DataType) => {
    switch(type) {
      case 'all': return allColors;
      case 'syslog': return syslogColors;
      case 'dataflow': return dataflowColors;
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm font-medium text-gray-600">Typ</span>
      <div className="flex items-center space-x-2">
        {(['all', 'syslog', 'dataflow'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setDataType(type)}
            className={`
              px-3 py-1 rounded-full text-sm font-medium transition-all
              ${getColorForType(type).getButtonClasses(dataType === type)}
            `}
          >
            {type === 'all' ? 'Vše' : type === 'syslog' ? 'Syslog' : 'Dataflow'}
          </button>
        ))}
      </div>
    </div>
  );
}