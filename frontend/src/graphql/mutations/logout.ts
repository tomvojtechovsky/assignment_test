// frontend/src/graphql/mutations/logout.ts
import { gql } from '@apollo/client';

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    auth {
      logout
    }
  }
`;