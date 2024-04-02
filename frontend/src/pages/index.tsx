import Head from 'next/head';

import { MainLayout } from '@/layout/MainLayout';
import { Articles } from '@/modules/articles';
import TopArticles from '@/modules/articles/TopArticles';
import { apolloClientServer } from '@/api/apolloClientServer';
import { GetArticlesListDocument } from '@/modules/articles/graphql/query/__generated__/getArticlesList';
import { ArticleEntity } from '@/__generated__/types';
import generateRssFeed from '@/utils/rss';

export const getStaticProps = async () => {
  const { data: articlesData } = await apolloClientServer?.query({
    query: GetArticlesListDocument,
    variables: {
      pagination: {
        limit: -1,
      },
      sort: ['dateCreated:DESC'],
      filters: {
        reviewed: { eq: true },
      },
    },
  });

  const allArticles = articlesData?.articles?.data as ArticleEntity[];

  generateRssFeed(allArticles);
  return {
    props: { allArticles },
  };
};

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
