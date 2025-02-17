// frontend\src\graphql\mutations.ts
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    auth {
      login(username: $username, password: $password)
    }
  }
`;