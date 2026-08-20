import { MainLayout } from "@/layout/MainLayout";
import { GreenlyEditorsIntroduction, GreenlyEditorsList } from "@/modules/greenlyEditors";
import { Seo } from "@/uiCore/components/Seo";

const Editor = () => {
  return (
    <>
      <Seo
        title="Our Editors"
        description="Meet the editorial team behind the Green Place's climate and sustainability reporting."
        path="/editor"
      />
      <MainLayout>
        <GreenlyEditorsIntroduction />
        <GreenlyEditorsList />
      </MainLayout>
    </>
  );
};

export default Editor;
