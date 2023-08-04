import { typeDefs } from './typeDefs';
import { myClapResolver } from './myClapResolver';
import { addClapResolver } from './addClapResolver';
import { removeClapResolver } from './removeClapResolver';

export const claps = () => ({
  typeDefs,
  resolvers: {
    Article: {
      myClap: myClapResolver,
    },
    Mutation: {
      removeClap: removeClapResolver,
      addClap: addClapResolver,
    },
  },
});
