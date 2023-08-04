import { gql } from '@apollo/client';

export const LOCAL_SCHEMA = gql`
  directive @client on FIELD
`;
