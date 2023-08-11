import { ApolloClient, NormalizedCacheObject, ApolloLink, HttpLink, fromPromise, ServerError } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
// import { RestLink } from 'apollo-link-rest';
import { useMemo } from 'react';
import type { AppProps } from 'next/app';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { IncomingHttpHeaders } from 'http';
import { apolloCache } from './apolloCacheConfig';
import { logout } from '@/utils/logout';
import { auth } from '@/modules/firebase/firebaseSetup';
import { renewToken } from '@/config/renewToken';
import { LOCAL_SCHEMA } from './store/localSchema';

// export const getApolloUri = () => {
//   if (process.env.REACT_APP_ENV === 'development') {
//     return process.env.REACT_APP_DEVELOPMENT_API_URL || '';
//   } else if (process.env.REACT_APP_ENV === 'production') {
//     return process.env.REACT_APP_PRODUCTION_API_URL || '';
//   } else {
//     throw new Error('No environment specified');
//   }
// };

export const JWT_KEY = 'jwt';

export let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  // const errorLink = onError(({ networkError, graphQLErrors, operation, forward }) => {
  //   if (
  //     (operation.operationName === 'Me' && graphQLErrors?.[0].message === 'Forbidden access') ||
  //     (networkError && (networkError as ServerError).statusCode === 401 && operation.operationName !== 'LoginByToken')
  //   ) {
  //     if (auth.currentUser) {
  //       return fromPromise(renewToken(auth.currentUser))
  //         .filter(value => Boolean(value))
  //         .flatMap(newToken => {
  //           const oldHeaders = operation.getContext().headers;
  //           operation.setContext({
  //             headers: {
  //               ...oldHeaders,
  //               ...(newToken ? { authorization: `Bearer ${newToken}` } : null),
  //             },
  //           });
  //           return forward(operation);
  //         });
  //     } else {
  //       logout();
  //     }
  //   }
  // });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        {
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        }
      });
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    let token;
    if (typeof window !== 'undefined' && localStorage.getItem(JWT_KEY)) {
      token = localStorage.getItem(JWT_KEY);
    }

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_API,
    // headers,
  });

  // const restLink = new RestLink({
  //   uri: `${GRAPHQL_API}`,
  //   endpoints: {
  //     blob: {
  //       uri: `${GRAPHQL_API}`,
  //       responseTransformer: async response => {
  //         return {
  //           blob: response.blob(),
  //         };
  //       },
  //     },
  //   },
  //   typePatcher: {
  //     ReportPDFPayload: (data: Promise<{ blob: Blob }>) => data,
  //   },
  // });

  const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

  if (!apolloClient || typeof window === 'undefined') {
    apolloClient = new ApolloClient({
      link,
      cache: apolloCache,
      typeDefs: LOCAL_SCHEMA,
    });
  }

  return apolloClient;
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: AppProps['pageProps']) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps ? pageProps[APOLLO_STATE_PROP_NAME] : '';
  const store = useMemo(() => initializeApollo({ initialState: state }), [state]);
  return store;
}
