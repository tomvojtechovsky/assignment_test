import Card from '../dashboard/shared/Card';
import { useMetrics } from '../../hooks/useMetrics';

export default function RecentActivityCard() {
  const { metrics, loading } = useMetrics();

  // Určení trendu aktivity
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

  // Mapování trendu na vizuální prvky
  const trendInfo = {
    high: { 
      color: 'text-red-600', 
      icon: '🔥', 
      text: 'Vysoká aktivita' 
    },
    low: { 
      color: 'text-green-600', 
      icon: '😌', 
      text: 'Nízká aktivita' 
    },
    normal: { 
      color: 'text-blue-600', 
      icon: '📊', 
      text: 'Normální aktivita' 
    },
    stable: { 
      color: 'text-gray-600', 
      icon: '😐', 
      text: 'Stabilní aktivita' 
    }
  };

  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 text-blue-500">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700">Aktivita za 24h</h3>
        
        {loading ? (
          <div className="animate-pulse h-8 bg-gray-200 rounded mt-2"></div>
        ) : (
          <>
            <div className="mt-2 flex items-center">
              <span className={`text-3xl font-bold ${trendInfo[trend].color}`}>
                {metrics.last24hCount}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                zpráv / 24h
              </span>
            </div>
            
            <div className="mt-4 flex items-center text-sm">
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