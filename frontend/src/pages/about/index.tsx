import { MainLayout } from "@/layout/MainLayout";
import { AboutDescription } from "@/modules/about/aboutDescription";
import { ContactFooter } from "@/modules/about/contactFooter";
import { Contribute } from "@/modules/about/contribute/Contribute";
import { GreenlyEditor } from "@/modules/about/greenlyEditor/GreenlyEditor";
import { Team } from "@/modules/about/team";
import { MailFormFooter } from "@/uiCore/components/MailFormFooter";
import { Seo } from "@/uiCore/components/Seo";

function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Green Place is the front page of the green revolution — learn about our mission, our editorial team, and how to contribute climate and sustainability reporting."
        path="/about"
      />
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
