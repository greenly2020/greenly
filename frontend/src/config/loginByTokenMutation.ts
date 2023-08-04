import { gql } from '@apollo/client';

export const LOGIN_BY_TOKEN = gql`
  mutation LoginByToken($tokenId: String!) {
    loginByToken(tokenId: $tokenId) {
      jwt
    }
  }
`;
