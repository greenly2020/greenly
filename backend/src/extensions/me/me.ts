import { typeDefs } from './typeDefs';

import { myLikedArticlesResolver } from './myLikedArticlesResolver';

export const me = () => ({
  typeDefs,
  resolvers: {
    Query: {
      myLikedArticles: myLikedArticlesResolver,
    },
  },
});
