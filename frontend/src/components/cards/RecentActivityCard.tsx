// components/cards/RecentActivityCard.tsx
import { MetricsCard } from '../dashboard/shared/MetricsCard';
import { useMetrics } from '../../hooks/useMetrics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSmile, faChartBar, faMeh } from '@fortawesome/free-solid-svg-icons';

export default function RecentActivityCard() {
  const { metrics, loading } = useMetrics();
 
  const getTrend = () => {
    const totalMessages = metrics.total;
    const last24hMessages = metrics.last24hCount;
    
    if (totalMessages === 0) return 'stable';
    
    const percentageOfDay = (last24hMessages / totalMessages) * 100;
    
    if (percentageOfDay > 30) return 'high';
    if (percentageOfDay < 10) return 'low';
    return 'normal';
  };
 
  const trend = getTrend();
 
  const trendInfo = {
    high: { 
      icon: faFire,
      text: 'Vysoká aktivita',
      color: 'text-red-600' 
    },
    low: { 
      icon: faSmile,
      text: 'Nízká aktivita',
      color: 'text-green-600' 
    },
    normal: { 
      icon: faChartBar,
      text: 'Normální aktivita',
      color: 'text-blue-600' 
    },
    stable: { 
      icon: faMeh,
      text: 'Stabilní aktivita',
      color: 'text-gray-600' 
    }
  };
 
  return (
    <MetricsCard
      title="Aktivita za 24 h"
      loading={loading}
      footer={
        <div className="flex items-center justify-center text-sm">
          <FontAwesomeIcon 
            icon={trendInfo[trend].icon} 
            className={`mr-2 text-2xl ${trendInfo[trend].color}`} 
          />
          <span className={`${trendInfo[trend].color}`}>
            {trendInfo[trend].text}
          </span>
        </div>
      }
    >
      <span className={`text-3xl font-bold ${trendInfo[trend].color}`}>
        {metrics.last24hCount}
      </span>
      <span className="ml-2 text-sm text-gray-600">
        zpráv / 24h
      </span>
    </MetricsCard>
  );
 }