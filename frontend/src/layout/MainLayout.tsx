import { useReactiveVar } from '@apollo/client';
import { globalState } from '@/config/globalState';
import { Footer } from '@/uiCore/components/Footer';
import { CategoryBar } from '@/uiCore/components/CategoryBar';
import { NavBar } from '@/uiCore/components/NavBar/NavBar';
import { MailFormFooter } from '@/uiCore/components/MailFormFooter';

interface MainLayoutProps {
  navBar?: boolean;
  categoryBar?: boolean;
  mailForm?: boolean;
  children: React.JSX.Element | React.JSX.Element[] | null;
}

export const MainLayout = ({ children, navBar = true, categoryBar = true, mailForm = true }: MainLayoutProps) => {
  const currentUserLoading = useReactiveVar(globalState.currentUserLoading);

  return (
    <>
      {navBar && <NavBar />}
      {categoryBar && <CategoryBar />}
      {<main className="content">{!currentUserLoading && children}</main>}
      {mailForm && <MailFormFooter />}
      <Footer />
    </>
  );
};
