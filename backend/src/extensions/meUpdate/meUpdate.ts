import { meUpdateResolver } from './meUpdateResolver';
import { resolversConfig } from './resolversConfig';
import { typeDefs } from './typeDefs';

export const meUpdate = () => ({
  typeDefs,
  resolversConfig: resolversConfig,
  resolvers: {
    Mutation: {
      meUpdate: meUpdateResolver,
    },
  },
});
