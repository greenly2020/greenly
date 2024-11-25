import { MainLayout } from '@/layout/MainLayout';
import { CATEGORIES } from '@/modules/articleEditor/constants';
import TopArticles from '@/modules/articles/TopArticles';
import { Browse } from '@/modules/browse';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';

export const BrowseCategoryPage = () => {
  const { push, query } = useRouter();
  const category = query.category as string;
  const activeCategory = CATEGORIES?.find((cat) => cat.value === category);

  if (typeof window !== 'undefined' && !activeCategory) {
    push('/');
    return null;
  }

  return activeCategory ? (
    <>
      <Head>
        <title>{activeCategory?.label || 'Green Place'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={activeCategory?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout mailForm={false}>
        <>
          <Browse category={category} />
          <TopArticles />
        </>
      </MainLayout>
    </>
  ) : null;
};

export default BrowseCategoryPage;
