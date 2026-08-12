import { useRouter } from 'next/router';
import { MainLayout } from '@/layout/MainLayout';
import { ArticleEditor } from '@/modules/articleEditor';
import { useMe } from '@/modules/hooks/useMe';
import { Seo } from '@/uiCore/components/Seo';

export default function SubmitArticle() {
  return (
    <>
      <Seo
        title="Submit an Article"
        description="Submit an article to Green Place."
        path="/submit"
        noindex
      />
      <MainLayout categoryBar={false}>
        <ArticleEditor />
      </MainLayout>
    </>
  );
}
