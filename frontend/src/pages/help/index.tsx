import Head from 'next/head';

import Help from '@/modules/help/Help';
import { MainLayout } from '@/layout/MainLayout';

export default function HelpPage() {
  return (
    <>
      <Head>
        <title>How to use Green Place</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="How to use Green Place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Help />
      </MainLayout>
    </>
  );
}
