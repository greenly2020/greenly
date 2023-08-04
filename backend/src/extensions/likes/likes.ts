import { typeDefs } from './typeDefs';

import { addLikeResolver } from './addLikeResolver';
import { myLikeResolver } from './myLikeResolver';
import { removeLikeResolver } from './removeLikeResolver';

export const likes = () => ({
  typeDefs,
  resolvers: {
    Article: {
      myLike: myLikeResolver,
    },
    Mutation: {
      removeLike: removeLikeResolver,
      addLike: addLikeResolver,
    },
  },
});
