import Card from '../dashboard/shared/Card';
import { useMetrics } from '../../hooks/useMetrics';

export default function ThreatsCard() {
  const { metrics, loading } = useMetrics();

  // Výpočet procenta hrozeb
  const threatPercentage = metrics.total > 0 
    ? ((metrics.threatsCount / metrics.total) * 100).toFixed(1) 
    : '0';

  // Určení směru trendu
  const trendDirection = metrics.threatsCount > metrics.total * 0.2 ? 'up' : 'down';

  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 text-red-500">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700">Detekované hrozby</h3>
        
        {loading ? (
          <div className="animate-pulse h-8 bg-gray-200 rounded mt-2"></div>
        ) : (
          <>
            <div className="mt-2 flex items-center">
              <span className="text-3xl font-bold text-red-600">
                {metrics.threatsCount}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                ({threatPercentage} %)
              </span>
            </div>
            
            <div className="mt-4 flex justify-between text-sm">
              <div className="text-gray-600">
                Trend: 
                {trendDirection === 'up' ? (
                  <span className="text-red-500 ml-1">↑ Rostoucí</span>
                ) : (
                  <span className="text-green-500 ml-1">↓ Klesající</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}