import { globalState } from '@/config/globalState';
import { InMemoryCache } from '@apollo/client';

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // articleByLink: {
        //   merge(existing = {}, incoming: any) {
        //     return { ...existing, ...incoming };
        //   },
        // },
      },
    },
  },
});
