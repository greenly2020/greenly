export const typeDefs = `
  type Mutation {
    loginByToken(tokenId: String!): UsersPermissionsLoginPayload
    regenerateArticleLink: String
  }
`;
