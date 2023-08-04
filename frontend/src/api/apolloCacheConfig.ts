import { globalState } from '@/config/globalState';
import { InMemoryCache } from '@apollo/client';

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // myCars: {
        //   read() {
        //     return globalState.myCars();
        //   },
        // },
      },
    },
  },
});
