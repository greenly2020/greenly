import Head from 'next/head';

import { useRouter } from 'next/router';
import { MainLayout } from '@/layout/MainLayout';
import { ArticleEditor } from '@/modules/articleEditor';
import { useMe } from '@/modules/hooks/useMe';

export default function SubmitArticle() {
  return (
    <>
      <Head>
        <title>Submit an Article</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content='Submit an Article' />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <MainLayout categoryBar={false}>
        <ArticleEditor />
      </MainLayout>
    </>
  );
}
