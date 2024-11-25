import Head from 'next/head';

import { Articles } from '@/modules/articles';
import { MainLayout } from '@/layout/MainLayout';
import TopArticles from '@/modules/articles/TopArticles';

export const BrowsePage = () => {
  return (
    <>
      <Head>
        <title>Green Place</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Front page of the green revolution" />
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
};

export default BrowsePage;
