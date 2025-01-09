// components/cards/TotalMessagesCard.tsx
import { MetricsCard } from '../dashboard/shared/MetricsCard';
import { useTypeColor } from '../../hooks/useTypeColor';


interface TotalMessagesMetrics {
  total: number;
  syslogCount: number;
  dataflowCount: number;
}

interface TotalMessagesCardProps {
  metrics: TotalMessagesMetrics;
  loading?: boolean;
}

export default function TotalMessagesCard({
  metrics,
  loading = false
}: TotalMessagesCardProps) {

  const syslogTextColor = useTypeColor('syslog').getTextColor();
  const dataflowTextColor = useTypeColor('dataflow').getTextColor();

  return (
    <MetricsCard
      title="Celkem zpráv"
      loading={loading}
      footer={
        <div className="flex justify-between text-sm">
          <div className="text-gray-600">
            <span className="text-type-syslog font-medium text-base">
              {metrics.syslogCount.toLocaleString()}
            </span>
            {' '}Syslog
          </div>
          <div className="text-gray-600">
            <span className="text-type-flow font-medium text-base">
              {metrics.dataflowCount.toLocaleString()}
            </span>
            {' '}Dataflow
          </div>
        </div>
      }
    >
      <span className="text-3xl font-bold text-gray-900">
        {metrics.total.toLocaleString()}
      </span>
    </MetricsCard>
  );

}