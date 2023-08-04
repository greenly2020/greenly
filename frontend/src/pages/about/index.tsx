import Head from "next/head";
import { MainLayout } from "@/layout/MainLayout";
import { AboutDescription } from "@/modules/about/aboutDescription";
import { ContactFooter } from "@/modules/about/contactFooter";
import { Contribute } from "@/modules/about/contribute/Contribute";
import { GreenlyEditor } from "@/modules/about/greenlyEditor/GreenlyEditor";
import { Team } from "@/modules/about/team";
import { MailFormFooter } from "@/uiCore/components/MailFormFooter";

function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="About Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <AboutDescription variant="primary" />
        <Team variant="primary" />
        <Contribute />
        <GreenlyEditor />
        <ContactFooter variant="primary" />
      </MainLayout>
    </>
  );
}

export default About;
