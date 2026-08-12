import { useRouter } from 'next/router';
import { Search } from '@/modules/browse';
import { MainLayout } from '@/layout/MainLayout';
import { Seo } from '@/uiCore/components/Seo';

export const SearchPage = () => {
  const { push, query, isReady } = useRouter();
  const term = query.term as string;
  if (isReady && !term) {
    push('/');
    return null;
  }
  return (
    <>
      <Seo
        title={term ? `Search: ${term}` : 'Search'}
        description="Search Green Place articles."
        path={`/search${term ? `?term=${encodeURIComponent(term)}` : ''}`}
        noindex
      />
      <MainLayout mailForm={false}>
        <Search term={term} />
      </MainLayout>
    </>
  );
};
export default SearchPage;
