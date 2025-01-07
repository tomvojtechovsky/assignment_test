import { Card } from '../dashboard/shared/Card';
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
    <Card className="relative p-6 shadow-md rounded-lg bg-white text-gray-800 border border-gray-200">
      {/* Jemná horizontální linie jako grafický prvek */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-red-500 rounded-md"></div>

      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-500 mb-4">Detekované hrozby</h3>

        {loading ? (
          <div className="animate-pulse h-8 bg-gray-300 rounded mt-2 mx-auto w-24"></div>
        ) : (
          <>
            <div className="mt-2 flex items-center justify-center">
              <span className="text-3xl font-bold text-red-600">
                {metrics.threatsCount}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                ({threatPercentage} %)
              </span>
            </div>

            <div className="mt-4 flex justify-center text-sm">
              <div className="text-gray-600">
                Trend:
                {trendDirection === 'up' ? (
                  <span className="text-red-500 ml-1">⬆️ Rostoucí</span>
                ) : (
                  <span className="text-green-500 ml-1">⬇️ Klesající</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
