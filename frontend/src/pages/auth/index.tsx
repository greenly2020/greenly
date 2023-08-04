import Head from 'next/head';
import { useMe } from '@/modules/hooks/useMe';
import { Login } from '@/modules/firebase/components/Login';

import { MainLayout } from '@/layout/MainLayout';
import { useRouter } from 'next/router';

export default function Auth() {
  const { me } = useMe();
  const { push, isReady } = useRouter();
  if (isReady && me) {
    push('/');
  }

  return (
    <>
      <Head>
        <title>Greenly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Login />
      </MainLayout>
    </>
  );
}
