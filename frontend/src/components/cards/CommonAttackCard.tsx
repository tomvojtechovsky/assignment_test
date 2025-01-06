import {Card} from '../dashboard/shared/Card';
import { useMetrics } from '../../hooks/useMetrics';

export default function CommonAttackCard() {
    const { metrics, loading } = useMetrics();

    // Najdi nejčastější typ útoku
    const getMostCommonAttack = () => {
        if (loading || !metrics.attacksByType || metrics.attacksByType.length === 0) return null;
        
        return Array.isArray(metrics.attacksByType) ? metrics.attacksByType.reduce((max, attack) => 
          (max?.count || 0) > attack.count ? max : attack
        ) : null;
      };

    const mostCommonAttack = getMostCommonAttack();

    return (
        <Card className="relative">
            <div className="absolute top-4 right-4 text-yellow-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">Nejčastější útok</h3>

                {loading ? (
                    <div className="animate-pulse h-8 bg-gray-200 rounded mt-2"></div>
                ) : (
                    mostCommonAttack ? (
                        <>
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-yellow-600">
                                    {mostCommonAttack.attackType}
                                </span>
                                <br />
                                <span className="ml-2 text-sm text-gray-600">
                                    ({mostCommonAttack.count} výskytů)
                                </span>
                            </div>

                            <div className="mt-4 text-sm text-gray-600">
                                Podíl na všech hrozbách:
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