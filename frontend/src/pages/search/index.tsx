import Head from 'next/head';
import { useRouter } from 'next/router';

import { Search } from '@/modules/browse';
import { MainLayout } from '@/layout/MainLayout';

export const SearchPage = () => {
  const { push, query, isReady } = useRouter();
  const term = query.term as string;

  if (isReady && !term) {
    push('/');
    return null;
  }
  return (
    <>
      <Head>
        <title>Search on Greenly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content='Search on Greenly' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout mailForm={false}>
        <Search term={term} />
      </MainLayout>
    </>
  );
};

export default SearchPage;
