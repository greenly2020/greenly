import Head from 'next/head';

import { Article } from '@/modules/article';
import { MainLayout } from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';
import { GetArticleByLinkDocument } from '@/modules/article/graphql/query/__generated__/getArticleByLink';
import { apolloClientServer } from '@/api/apolloClientServer';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let parsedArticleData = { title: '', abstract: '', link: '' };
  const articleLink = ctx?.query?.articleLink as string | undefined;
  if (!articleLink) {
    return {
      notFound: true,
    };
  }

  const { data: articleData } = await apolloClientServer.query({
    query: GetArticleByLinkDocument,
    variables: {
      articleLink,
    },
  });

  const abstract: string = articleData?.articleByLink?.data?.attributes
    ?.abstract as string;

  if (
    typeof abstract === 'string' &&
    JSON.parse(abstract).blocks[0].text !== ''
  ) {
    parsedArticleData = {
      ...parsedArticleData,
      abstract: JSON.parse(abstract)
        ?.blocks?.map(({ text }: { text: string }) => text)
        .join(' '),
    };
  }
  parsedArticleData = articleData?.articleByLink?.data && {
    ...parsedArticleData,
    title: articleData?.articleByLink?.data?.attributes?.title,
  };
  return {
    props: {
      articleData: parsedArticleData,
      articleLink,
    },
  };
};

export const ArticlePage = ({ articleData, articleLink }: any) => {
  return (
    <>
      <Head>
        <title>{articleData?.title || 'Greenly'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={articleData?.abstract || ''} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href={`/articles/${articleLink}`}
          key="canonical"
        />
      </Head>
      <MainLayout mailForm={false}>
        <Article />
      </MainLayout>
    </>
  );
};

export default ArticlePage;
