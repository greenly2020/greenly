import Help from '@/modules/help/Help';
import { MainLayout } from '@/layout/MainLayout';
import { Seo } from '@/uiCore/components/Seo';

export default function HelpPage() {
  return (
    <>
      <Seo
        title="How to Use Green Place"
        description="A quick guide to getting the most out of Green Place — reading, saving, and contributing articles."
        path="/help"
      />
      <MainLayout>
        <Help />
      </MainLayout>
    </>
  );
}
