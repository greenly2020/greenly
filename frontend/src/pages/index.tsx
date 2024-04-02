import Head from 'next/head';

import { MainLayout } from '@/layout/MainLayout';
import { Articles } from '@/modules/articles';
import TopArticles from '@/modules/articles/TopArticles';

export default function Home() {
  return (
    <>
      <Head>
        <title>Greenly - Front page of the green revolution</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Greenly - Front page of the green revolution"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`/`} key="canonical" />
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
