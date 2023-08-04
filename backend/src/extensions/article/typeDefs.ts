export const typeDefs = `
  type Query {
    articleByLink(articleLink: String!): ArticleEntityResponse
  }
  type Mutation {
    incViews(articleId: ID!): ArticleEntityResponse
  }
`;
