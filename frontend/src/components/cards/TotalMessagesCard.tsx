import { Card } from '../dashboard/shared/Card';

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
    <Card className="relative p-6 shadow-md rounded-lg bg-white text-gray-800 border border-gray-200">
      {/* Jemná horizontální linie jako grafický prvek */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-md"></div>

      {/* Obsah */}
      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-500 mb-4">Celkem zpráv</h3>
        
        {loading ? (
          <div className="animate-pulse h-8 bg-gray-300 rounded mt-2 mx-auto w-24"></div>
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
