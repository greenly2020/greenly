export const typeDefs = `
  extend type Article {
    myLike: Boolean
  }

  type Mutation {
    addLike(articleId: ID!): ArticleEntity
    removeLike(articleId: ID!): ArticleEntity
  }
`;
