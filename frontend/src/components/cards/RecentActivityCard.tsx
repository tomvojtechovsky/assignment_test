import { Card } from '../dashboard/shared/Card';
import { useMetrics } from '../../hooks/useMetrics';

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
      icon: '🔥', // Příklad s textem místo ikony
      text: 'Vysoká aktivita',
      color: 'text-red-600' 
    },
    low: { 
      icon: '😌', // Příklad s textem místo ikony
      text: 'Nízká aktivita',
      color: 'text-green-600' 
    },
    normal: { 
      icon: '📊', // Příklad s textem místo ikony
      text: 'Normální aktivita',
      color: 'text-blue-600' 
    },
    stable: { 
      icon: '😐', // Příklad s textem místo ikony
      text: 'Stabilní aktivita',
      color: 'text-gray-600' 
    }
  };

  return (
    <Card className="relative p-6 shadow-md rounded-lg bg-white text-gray-800 border border-gray-200">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-md"></div>

      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-500 mb-4">Aktivita za 24h</h3>

        {loading ? (
          <div className="animate-pulse h-8 bg-gray-300 rounded mt-2 mx-auto w-24"></div>
        ) : (
          <>
            <div className="mt-2 flex items-center justify-center">
              <span className={`text-3xl font-bold ${trendInfo[trend].color}`}>
                {metrics.last24hCount}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                zpráv / 24h
              </span>
            </div>
            
            <div className="mt-4 flex items-center justify-center text-sm">
              <span className="mr-2 text-2xl">{trendInfo[trend].icon}</span>
              <span className={`${trendInfo[trend].color}`}>
                {trendInfo[trend].text}
              </span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
