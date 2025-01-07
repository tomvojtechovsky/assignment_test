import { Card } from '../dashboard/shared/Card';
import { useMetrics } from '../../hooks/useMetrics';

interface AttackTypeCount {
  attackType: string;
  count: number;
}

export default function CommonAttackCard() {
  const { metrics, loading } = useMetrics();

  const getMostCommonAttack = (): AttackTypeCount | null => {
    if (loading || !metrics.attacksByType || Object.keys(metrics.attacksByType).length === 0) return null;

    const attacksArray = Object.values(metrics.attacksByType) as unknown as AttackTypeCount[];

    return attacksArray.reduce((max, attack) => 
      (max.count > attack.count ? max : attack), attacksArray[0]);
  };

  const mostCommonAttack = getMostCommonAttack();

  return (
    <Card className="relative p-6 shadow-md rounded-lg bg-white text-gray-800 border border-gray-200">
      {/* Jemná horizontální linie jako grafický prvek */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-yellow-500 rounded-md"></div>

      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-500 mb-4">Nejčastější útok</h3>

        {loading ? (
          <div className="animate-pulse h-8 bg-gray-300 rounded mt-2 mx-auto w-24"></div>
        ) : (
          mostCommonAttack ? (
            <>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-700">
                  {mostCommonAttack.attackType}
                </span>
                <br />
                <span className="ml-2 text-sm text-gray-500">
                  ({mostCommonAttack.count} výskytů)
                </span>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <span className="mr-1">Podíl na všech hrozbách: </span>
                {mostCommonAttack.count > 0 && metrics.threatsCount > 0
                  ? `${((mostCommonAttack.count / metrics.threatsCount) * 100).toFixed(1)} %`
                  : '0 %'}
              </div>
            </>
          ) : (
            <div className="text-gray-500">Žádné hrozby nebyly detekovány</div>
          )
        )}
      </div>
    </Card>
  );
}
