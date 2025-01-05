// frontend/src/graphql/queries/getActivityData.ts
import { gql } from '@apollo/client';

export const GET_ACTIVITY_DATA = gql`
  query GetActivityData($period: String!) {
    activityData(period: $period) {
      label
      count
    }
  }
`;