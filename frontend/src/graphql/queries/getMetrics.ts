// graphql/queries/getMetrics.ts
import { gql } from '@apollo/client';

export const GET_METRICS = gql`
  query GetMetrics(
    $type: String, 
    $startDate: String, 
    $endDate: String
    $threat: Boolean
  ) {
    metrics(
      type: $type, 
      startDate: $startDate, 
      endDate: $endDate
      threat: $threat
    ) {
      totalCount
      syslogCount
      dataflowCount
      threatsCount
      attacksByType {
        attackType
        count
      }
      last24hCount
    }
  }
`;