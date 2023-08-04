export const typeDefs = `
  extend type Article {
    myClap: Boolean
  }

  type Mutation {
    addClap(articleId: ID!): ArticleEntity
    removeClap(articleId: ID!): ArticleEntity
  }
`;
