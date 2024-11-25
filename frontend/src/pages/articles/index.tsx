import Head from 'next/head';

import { MainLayout } from '@/layout/MainLayout';
import { Articles } from '@/modules/articles';
import TopArticles from '@/modules/articles/TopArticles';

export const ArticlesPage = () => {
  return (
    <>
      <Head>
        <title>Green Place</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Front page of the green revolution" />
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
};

export default ArticlesPage;
