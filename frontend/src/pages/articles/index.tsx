import { MainLayout } from '@/layout/MainLayout';
import { Articles } from '@/modules/articles';
import TopArticles from '@/modules/articles/TopArticles';
import { Seo } from '@/uiCore/components/Seo';

export const ArticlesPage = () => {
  return (
    <>
      <Seo
        title="Green Place — Climate & Sustainability News, Data, and Analysis"
        description="Green Place is the front page of the green revolution: data-driven climate, energy, and sustainability journalism covering environment, technology, economy, and society."
        path="/"
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

export default ArticlesPage;
