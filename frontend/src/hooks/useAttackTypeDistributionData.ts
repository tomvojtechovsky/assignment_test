import { useQuery } from '@apollo/client';
import { GET_ATTACK_TYPE_DISTRIBUTION } from '../graphql/queries/getAttackTypeDistributionData';
import { DataType } from '../components/filters/global/types/filters';

interface AttackTypeDistributionPoint {
  attackType: string;
  count: number;
}

export function useAttackTypeDistributionData(
  startDate: Date | null = null, 
  endDate: Date | null = null,
  type: DataType = 'all',
  threat: boolean | null = null
) {
  const { data, loading, error } = useQuery<{ attackTypeDistribution: AttackTypeDistributionPoint[] }>(GET_ATTACK_TYPE_DISTRIBUTION, {
    variables: {
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      type: type === 'all' ? null : type,
      threat
    },
  });

  return {
    data: data?.attackTypeDistribution || [],
    loading,
    error,
    isEmpty: !loading && (!data?.attackTypeDistribution || data.attackTypeDistribution.length === 0)
  };
}