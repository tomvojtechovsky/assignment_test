// components/dashboard/overview/MetricsCards.tsx
/**
* Komponenta zobrazující metriky v kartách
* - Zobrazuje základní statistiky ze všech zpráv
* - Reaguje na globální filtry
* - Zobrazuje loading stav při načítání
*/
import TotalMessagesCard from './cards/TotalMessagesCard';
import ThreatsCard from './cards/ThreatsCard';
import CommonAttackCard from './cards/CommonAttackCard';
import RecentActivityCard from './cards/RecentActivityCard';

import { useMetrics } from '../../../hooks/useMetrics';


export default function MetricsCards() {
 const { metrics, loading, error } = useMetrics();

 if (error) {
   return <div className="text-red-500">Chyba při načítání metrik: {error.message}</div>;
 }

 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     <TotalMessagesCard 
       metrics={{
         total: metrics.total,
         syslogCount: metrics.syslogCount,
         dataflowCount: metrics.dataflowCount
       }} 
       loading={loading}
     />
      <ThreatsCard />
      <CommonAttackCard />
      <RecentActivityCard />
   </div>
 );
}