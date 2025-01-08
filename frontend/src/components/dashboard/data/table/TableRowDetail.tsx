import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNetworkWired, 
  faShieldAlt, 
  faInfoCircle, 
  faMapMarkerAlt,
  faCode
} from '@fortawesome/free-solid-svg-icons';

interface TableRowDetailProps {
  rowData: any;
}

export default function TableRowDetail({ rowData }: TableRowDetailProps) {
  // Pomocná funkce pro bezpečné zobrazení dat
  const safeDisplay = (value: any, fallback: string = 'N/A') => 
    value ?? fallback;

  return (
    <tr>
      <td colSpan={5}>
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-4">
          {/* Hlavní identifikace - centered */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-gray-800">
              {safeDisplay(rowData.probeName)}
            </h3>
            <p className="text-sm text-gray-600">
              {safeDisplay(rowData.timestamp)}
            </p>
            <p className="text-sm text-gray-600">
              {safeDisplay(rowData.probeIp)}
            </p>
          </div>

          {/* Bezpečnostní charakteristiky */}
          <div className="flex flex-wrap justify-center space-x-4 text-xs text-gray-700">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faShieldAlt} className="text-type-all w-4 h-4" />
              <span>{rowData.threat ? 'Hrozba' : 'Bez hrozby'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faInfoCircle} className="text-type-all w-4 h-4" />
              <span>{safeDisplay(rowData.type)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-type-all w-4 h-4" />
              <span>{safeDisplay(rowData.attackType)}</span>
            </div>
          </div>

          {/* Síťové informace */}
          <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faNetworkWired} className="text-type-all w-4 h-4" />
              <span>
                {safeDisplay(rowData.sourceIp)}:{safeDisplay(rowData.sourcePort)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faNetworkWired} className="text-type-all w-4 h-4" />
              <span>
                {safeDisplay(rowData.targetIp)}:{safeDisplay(rowData.targetPort)}
              </span>
            </div>
          </div>

          {/* Obsah zprávy */}
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 border-b pb-1 mb-2 inline-block">
              Obsah zprávy
            </div>
            <div className="flex justify-center items-center space-x-3">
              <FontAwesomeIcon icon={faCode} className="text-type-all w-4 h-4" />
              <div className="text-sm text-gray-700 max-w-xl break-words">
                {safeDisplay(rowData.content)}
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}