import { gql } from '@apollo/client';

export const GET_ATTACK_TYPE_DISTRIBUTION = gql`
  query GetAttackTypeDistribution(
    $startDate: String, 
    $endDate: String, 
    $type: String
    $threat: Boolean
  ) {
    attackTypeDistribution(
      startDate: $startDate, 
      endDate: $endDate, 
      type: $type
      threat: $threat
    ) {
      attackType
      count
    }
  }
`;