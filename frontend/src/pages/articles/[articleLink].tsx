import Head from 'next/head';

import { Article } from '@/modules/article';
import { MainLayout } from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';
import { GetArticleByLinkDocument } from '@/modules/article/graphql/query/__generated__/getArticleByLink';
import { apolloClientServer } from '@/api/apolloClientServer';

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const articleLink = ctx?.query?.articleLink as string | undefined;
//   if (!articleLink) {
//     return {
//       notFound: true,
//     };
//   }

//   const { data: articleData } = await apolloClientServer.query({
//     query: GetArticleByLinkDocument,
//     variables: {
//       articleLink,
//     },
//   });

//   return {
//     props: {
//       articleData,
//     },
//   };
// };

// export const ArticlePage = ({ articleData }: any) => {
export const ArticlePage = () => {
  return (
    <>
      <Head>
        {/* <title>{articleData.articleByLink.data.attributes.title || 'Greenly'}</title> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta name="description" content={articleData.articleByLink.data.attributes.abstract || ''} /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout mailForm={false}>
        <Article />
      </MainLayout>
    </>
  );
};

export default ArticlePage;
