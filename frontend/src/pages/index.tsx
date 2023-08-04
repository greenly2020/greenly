import Head from 'next/head';

import { MainLayout } from '@/layout/MainLayout';
import { Articles } from '@/modules/articles';
import TopArticles from '@/modules/articles/TopArticles';

export default function Home() {
  return (
    <>
      <Head>
        <title>Greenly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <>
          <Articles />
          <TopArticles />
        </>
      </MainLayout>
    </>
  );
}
