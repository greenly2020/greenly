import { MainLayout } from '@/layout/MainLayout';
import { CATEGORIES } from '@/modules/articleEditor/constants';
import TopArticles from '@/modules/articles/TopArticles';
import { Browse } from '@/modules/browse';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const BrowseCategoryPage = () => {
  const { isReady, push, query } = useRouter();
  const category = query.category as string;
  const foundCategory = CATEGORIES.find(cat => cat.value === category)

  if (isReady && !foundCategory) {
    push('/');
    return null;
  }

  return (
    <>
      <Head>
        <title>{foundCategory?.label ||'Greenly'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={foundCategory?.description}/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout mailForm={false}>
        <>
          <Browse category={category} />
          <TopArticles />
        </>
      </MainLayout>
    </>
  );
};

export default BrowseCategoryPage;
