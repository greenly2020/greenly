import { MainLayout } from '@/layout/MainLayout';
import GeneralGuidelines from '@/modules/writeForUs/components/GeneralGuidelines/GeneralGuidelines';
import Introduction from '@/modules/writeForUs/components/Introduction/Introduction';
import { Seo } from '@/uiCore/components/Seo';

const WriteForUs = () => {
  return (
    <>
      <Seo
        title="Write for Us"
        description="Contribute climate and sustainability reporting to Green Place — guidelines for writers and contributors."
        path="/write-for-us"
      />
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
