// components/filters/global/TypeFilter.tsx
import { useFilters } from '../../../context/FiltersContext';
import { DataType } from './types/filters';

export default function TypeFilter() {
  const { dataType, setDataType } = useFilters();
  
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm font-medium text-gray-600">Typ</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setDataType('all')}
          className={`
            px-3 py-1 rounded-full text-sm font-medium transition-all
            ${dataType === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
        >
          Vše
        </button>
        <button
          onClick={() => setDataType('syslog')}
          className={`
            px-3 py-1 rounded-full text-sm font-medium transition-all
            ${dataType === 'syslog' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
        >
          Syslog
        </button>
        <button
          onClick={() => setDataType('dataflow')}
          className={`
            px-3 py-1 rounded-full text-sm font-medium transition-all
            ${dataType === 'dataflow' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
        >
          Dataflow
        </button>
      </div>
    </div>
  );
  }