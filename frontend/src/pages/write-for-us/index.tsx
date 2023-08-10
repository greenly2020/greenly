import { MainLayout } from '@/layout/MainLayout';
import GeneralGuidelines from '@/modules/writeForUs/components/GeneralGuidelines/GeneralGuidelines';
import Introduction from '@/modules/writeForUs/components/Introduction/Introduction';
import Head from 'next/head';

const WriteForUs = () => {
  return (
    <>
      <Head>
        <title>Write for us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Write for us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <>
          <Introduction />
          <GeneralGuidelines />
        </>
      </MainLayout>
    </>
  );
};

export default WriteForUs;
