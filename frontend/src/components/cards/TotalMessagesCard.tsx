// components/cards/TotalMessagesCard.tsx
import Card from '../dashboard/shared/Card';

interface TotalMessagesMetrics {
  total: number;
  syslogCount: number;
  dataflowCount: number;
}

interface TotalMessagesCardProps {
  metrics: TotalMessagesMetrics;
  loading?: boolean;
}

export default function TotalMessagesCard({ metrics, loading = false }: TotalMessagesCardProps) {
  return (
    <Card className="relative">
      {/* Ikona */}
      <div className="absolute top-4 right-4 text-blue-500">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>

      {/* Obsah */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700">Celkem zpráv</h3>
        
        {loading ? (
          <div className="animate-pulse h-8 bg-gray-200 rounded mt-2"></div>
        ) : (
          <>
            <div className="mt-2">
              <span className="text-3xl font-bold text-gray-900">
                {metrics.total.toLocaleString()}
              </span>
            </div>
            
            <div className="mt-4 flex justify-between text-sm">
              <div className="text-gray-600">
                <span className="font-medium text-blue-600">{metrics.syslogCount.toLocaleString()}</span>
                {' '}Syslog
              </div>
              <div className="text-gray-600">
                <span className="font-medium text-green-600">{metrics.dataflowCount.toLocaleString()}</span>
                {' '}Dataflow
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}