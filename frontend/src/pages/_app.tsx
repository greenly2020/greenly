import { useEffect } from 'react';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/api/apolloClient';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';

import { auth } from '@/modules/firebase/firebaseSetup';
import { globalState } from '@/config/globalState';
import { LOGIN_BY_TOKEN } from '@/config/loginByTokenMutation';
import { MeDocument } from '@/modules/user/graphql/query/__generated__/me';
import { JWT_KEY } from '@/api/apolloClient';

import { theme } from '@/styles/theme';
import '@/styles/globals.css';
import createEmotionCache from '@/styles/createEmotionCache';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  deviceType,
}: MyAppProps & { deviceType: any }) {
  const apolloClient = useApollo(pageProps);

  const ssrMatchMedia = (query: any) => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width:
        deviceType === 'mobile'
          ? '0px'
          : deviceType === 'tablet'
          ? '641px'
          : '1141px',
    }),
  });

  theme.components = {
    MuiUseMediaQuery: {
      defaultProps: {
        ssrMatchMedia,
      },
    },
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(JWT_KEY);
    }
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      // @ts-ignore
      if (firebaseUser?.accessToken) {
        // @ts-ignore
        const { data } = await apolloClient?.mutate({
          mutation: LOGIN_BY_TOKEN,
          variables: {
            // @ts-ignore
            tokenId: firebaseUser?.accessToken,
          },
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem(JWT_KEY, data.loginByToken.jwt);
        }
      }
      try {
        if (firebaseUser) {
          // await renewToken(firebaseUser.);
          await apolloClient?.query({
            query: MeDocument,
          });
        }
      } catch (err) {
        console.log('debug > err===', err);
        // await logout();
      } finally {
        globalState.currentUserLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  let deviceType;

  if (context.ctx.req) {
    deviceType =
      parser(context.ctx.req.headers['user-agent']).device.type || 'desktop';
  }

  return {
    ...NextApp.getInitialProps(context),
    deviceType,
  };
};

export default App;
