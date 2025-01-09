// components/cards/ThreatsCard.tsx
import { MetricsCard } from '../dashboard/shared/MetricsCard';
import { useMetrics } from '../../hooks/useMetrics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function ThreatsCard() {
 const { metrics, loading } = useMetrics();

 // Výpočet procenta hrozeb
 const threatPercentage = metrics.total > 0
   ? ((metrics.threatsCount / metrics.total) * 100).toFixed(1)
   : '0';

 // Určení směru trendu
 const trendDirection = metrics.threatsCount > metrics.total * 0.2 ? 'up' : 'down';

 const getTrendColor = () => trendDirection === 'up' ? 'text-red-500' : 'text-green-500';
 const getTrendText = () => trendDirection === 'up' ? 'Rostoucí' : 'Klesající';
 const getTrendIcon = () => trendDirection === 'up' ? faArrowUp : faArrowDown;

 return (
   <MetricsCard
     title="Detekované hrozby"
     loading={loading}
     footer={
       <div className="flex items-center justify-center text-sm">
         <FontAwesomeIcon 
           icon={getTrendIcon()} 
           className={`mr-2 text-2xl ${getTrendColor()}`} 
         />
         <span className={getTrendColor()}>
           {getTrendText()}
         </span>
       </div>
     }
   >
       <span className="text-3xl font-bold text-red-600">
         {metrics.threatsCount}
       </span>
       <span className="text-sm text-gray-600 mt-1">
         ({threatPercentage} %)
       </span>
   </MetricsCard>
 );
}