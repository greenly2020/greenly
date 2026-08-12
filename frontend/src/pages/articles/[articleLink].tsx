import { Article } from '@/modules/article';
import { MainLayout } from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';
import { GetArticleByLinkDocument } from '@/modules/article/graphql/query/__generated__/getArticleByLink';
import { apolloClientServer } from '@/api/apolloClientServer';
import { DEFAULT_OG_IMAGE, Seo } from '@/uiCore/components/Seo';

const FALLBACK_DESCRIPTION =
  'Data-driven climate and sustainability reporting from Green Place.';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let parsedArticleData = {
    title: '',
    abstract: '',
    headerImage: '',
    authorName: '',
    dateCreated: '',
    category: '',
  };
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

  const attributes = articleData?.articleByLink?.data?.attributes;

  if (!attributes) {
    return {
      notFound: true,
    };
  }

  const abstract: string = attributes?.abstract as string;
  let parsedAbstract = '';
  if (typeof abstract === 'string') {
    try {
      const blocks = JSON.parse(abstract)?.blocks;
      if (Array.isArray(blocks) && blocks.length) {
        parsedAbstract = blocks
          .map(({ text }: { text: string }) => text)
          .join(' ')
          .trim();
      }
    } catch {
      // abstract wasn't parseable draft-js JSON; fall through to the site fallback description
    }
  }

  parsedArticleData = {
    title: attributes?.title || '',
    abstract: parsedAbstract || FALLBACK_DESCRIPTION,
    headerImage: (attributes?.headerImage as string) || '',
    authorName: attributes?.author?.data?.attributes?.name || 'Green Place',
    dateCreated: attributes?.dateCreated || '',
    category: attributes?.category || '',
  };

  return {
    props: {
      articleData: parsedArticleData,
      articleLink,
    },
  };
};

export const ArticlePage = ({ articleData, articleLink }: any) => {
  const path = `/articles/${articleLink}`;
  const ogImage = articleData?.headerImage || DEFAULT_OG_IMAGE;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData?.title,
    description: articleData?.abstract,
    image: ogImage,
    author: {
      '@type': 'Person',
      name: articleData?.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Green Place',
    },
    ...(articleData?.dateCreated
      ? { datePublished: articleData.dateCreated }
      : {}),
    mainEntityOfPage: path,
  };

  return (
    <>
      <Seo
        title={articleData?.title || 'Green Place'}
        description={articleData?.abstract || FALLBACK_DESCRIPTION}
        path={path}
        ogType="article"
        ogImage={ogImage}
        publishedTime={articleData?.dateCreated}
        jsonLd={jsonLd}
      />
      <MainLayout mailForm={false}>
        <Article />
      </MainLayout>
    </>
  );
};

export default ArticlePage;
