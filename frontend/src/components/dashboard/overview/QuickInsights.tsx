// frontend/src/components/dashboard/overview/QuickInsights.tsx
import { Card } from '../shared/Card';
import ActivityLineChart from './charts/ActivityLineChart';
import AttackTypeDistributionChart from './charts/AttackTypeDistributionChart';
import AttackTypeTreemapChart from './charts/AttackTypeTreemapChart';
import AttackTypeDistributionWaffle from './charts/AttackTypeDistributionWaffle';
//import AttackTypeDistributionBarChart from './charts/AttackTypeDistributionBarChart';
import DistributionMain from './charts/distributionChart/DistributionMain';
export default function QuickInsights() {
  return (
    <div className="w-full">
      <Card className="p-4 mt-4">
        <ActivityLineChart />


      </Card>
      <Card className="p-4 mt-4">
        <div className='flex justify-between items-center mt-4'>
          <DistributionMain />
        </div>
      </Card>
    </div>
  );
}