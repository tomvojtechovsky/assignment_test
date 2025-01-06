// frontend/src/graphql/queries/checkAuth.ts
import { gql } from '@apollo/client';

export const CHECK_AUTH = gql`
  query CheckAuth {
    auth {
      checkAuth
    }
  }
`;