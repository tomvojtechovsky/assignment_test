// frontend/src/components/dashboard/overview/QuickInsights.tsx
import Card from '../shared/Card';
import ActivityLineChart from './charts/ActivityLineChart';

export default function QuickInsights() {
  return (
    <div className="w-full">
      <Card className="p-4 mt-4">
        <ActivityLineChart />
      </Card>
    </div>
  );
}