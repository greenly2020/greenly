export const typeDefs = `
  type Query {
    myLikedArticles(
      pagination: PaginationArg, 
      sort: [String], 
    ): ArticleEntityResponseCollection
  }

  extend type UsersPermissionsMe {
    extId: String
    name: String
    bio: String 
    profilePicture: String
    profileLink: String
    displayName: String
  }
`;
