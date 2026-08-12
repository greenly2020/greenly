import { MainLayout } from '@/layout/MainLayout';
import { Articles } from '@/modules/articles';
import TopArticles from '@/modules/articles/TopArticles';
import { apolloClientServer } from '@/api/apolloClientServer';
import { GetArticlesListDocument } from '@/modules/articles/graphql/query/__generated__/getArticlesList';
import { ArticleEntity } from '@/__generated__/types';
import generateRssFeed from '@/utils/rss';
import { Seo, SITE_URL } from '@/uiCore/components/Seo';
import { SOCIAL_LINKS_LIST } from '@/config/socialLinks';

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Green Place',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    // Sourced from src/config/socialLinks.ts — update there, not here.
    sameAs: SOCIAL_LINKS_LIST,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Green Place',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?term={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
];

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
      <Seo
        title="Green Place — Climate & Sustainability News, Data, and Analysis"
        description="Green Place is the front page of the green revolution: data-driven climate, energy, and sustainability journalism covering environment, technology, economy, and society."
        path="/"
        jsonLd={homeJsonLd}
      />
      <MainLayout>
        <>
          <Articles />
          <TopArticles />
        </>
      </MainLayout>
    </>
  );
}
