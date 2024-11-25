import Head from "next/head";

import { MainLayout } from "@/layout/MainLayout";
import { GreenlyEditorsIntroduction, GreenlyEditorsList } from "@/modules/greenlyEditors";

const Editor = () => {
  return (
    <>
      <Head>
        <title>Green Place Editors</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Green Place Editors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <GreenlyEditorsIntroduction />
        <GreenlyEditorsList />
      </MainLayout>
    </>
  );
};

export default Editor;
