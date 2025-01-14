import { MetricsCard } from '../../shared/MetricsCard';
import { useMetrics } from '../../../../hooks/useMetrics';

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
    <MetricsCard
      title="Nejčastější útok"
      loading={loading}
      footer={
        mostCommonAttack ? (
          <div className="text-sm text-gray-600 text-center">
            <span className="mr-1">Podíl na všech hrozbách: </span>
            {mostCommonAttack.count > 0 && metrics.threatsCount > 0
              ? `${((mostCommonAttack.count / metrics.threatsCount) * 100).toFixed(1)} %`
              : '0 %'}
          </div>
        ) : undefined
      }
    >
      {loading ? null : (
        mostCommonAttack ? (
          <>
            <span className="text-4xl font-bold text-gray-700">
              {mostCommonAttack.attackType}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              ({mostCommonAttack.count} výskytů)
            </span>
          </>
        ) : (
          <span className="text-gray-500">Žádné hrozby nebyly detekovány</span>
        )
      )}
    </MetricsCard>
  );
}