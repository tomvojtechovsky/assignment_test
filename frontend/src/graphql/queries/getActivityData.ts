// frontend/src/graphql/queries/getActivityData.ts
import { gql } from '@apollo/client';

export const GET_ACTIVITY_DATA = gql`
  query GetActivityData($period: String!, $startDate: String, $endDate: String, $type: String) {
    activityData(period: $period, startDate: $startDate, endDate: $endDate, type: $type) {
      label
      count
    }
  }
`;