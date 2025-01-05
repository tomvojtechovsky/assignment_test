// graphql/queries/getTableData.ts
import { gql } from '@apollo/client';

export const GET_TABLE_DATA = gql`
  query GetMessages(
    $limit: Int!, 
    $offset: Int!, 
    $type: String, 
    $startDate: String, 
    $endDate: String
  ) {
    messages {
      messages(
        limit: $limit, 
        offset: $offset, 
        type: $type, 
        startDate: $startDate, 
        endDate: $endDate
      ) {
        items {
          ... on SyslogMessage {
            timestamp
            probeIp
            probeName
            content
            threat
            type
            attackType
          }
          ... on DataflowMessage {
            timestamp
            probeIp
            probeName
            content
            threat
            type
            attackType
            sourceIp
            sourcePort
            targetIp
            targetPort
          }
        }
        totalCount
        hasMore
      }
    }
  }
`;