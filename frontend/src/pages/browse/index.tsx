import { Articles } from '@/modules/articles';
import { MainLayout } from '@/layout/MainLayout';
import TopArticles from '@/modules/articles/TopArticles';
import { Seo } from '@/uiCore/components/Seo';

export const BrowsePage = () => {
  return (
    <>
      <Seo
        title="Browse All Topics"
        description="Browse every Green Place article across Environment, Technology, Economy, Society, and Energy — climate and sustainability reporting backed by primary data."
        path="/browse"
      />
      <MainLayout>
        <>
          <Articles />
          <TopArticles />
        </>
      </MainLayout>
    </>
  );
};

export default BrowsePage;
