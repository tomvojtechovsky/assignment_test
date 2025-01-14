// components/filters/global/TypeFilter.tsx
import { useFilters } from '../../../context/FiltersContext';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { ColorType } from '../../../constants/colors';

export default function TypeFilter() {
  const { dataType, setDataType } = useFilters();

  // Helper pro převod typu filtru na typ barvy
  const getColorType = (filterType: string): ColorType => {
    return filterType === 'all' ? 'main' : filterType as ColorType;
  };

  // Získání barevného schématu pro každý typ
  const getColorScheme = (type: string) => {
    const colorType = getColorType(type);
    const colors = useColorScheme(colorType);
    return colors.button[dataType === type ? 'active' : 'inactive'];
  };

  return (
    <div className="flex flex-col space-y-1 sm:space-y-2">
      <span className="text-xs sm:text-sm font-medium text-gray-600">Typ</span>
      <div className="flex items-center space-x-1 sm:space-x-2">
        {(['all', 'syslog', 'dataflow'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setDataType(type)}
            className={`
              px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all
              ${getColorScheme(type)}
            `}
          >
            {type === 'all' ? 'Vše' : type === 'syslog' ? 'Syslog' : 'Dataflow'}
          </button>
        ))}
      </div>
    </div>
  );
}