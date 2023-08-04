import { typeDefs } from './typeDefs';

import { loginResolver } from './loginResolver';
import { resolversConfig } from './resolversConfig';
import { regenerateArticleLinkResolver } from './regenerateArticleLinkResolver';

export const loginByToken = () => ({
  typeDefs,
  resolversConfig,
  resolvers: {
    Mutation: {
      loginByToken: loginResolver,
      regenerateArticleLink: regenerateArticleLinkResolver,
    },
  },
});
