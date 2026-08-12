import { UserProfile } from '@/modules/user';
import { useMe } from '@/modules/hooks/useMe';
import { MainLayout } from '@/layout/MainLayout';
import { UsersPermissionsMe } from '@/__generated__/types';
import { Login } from '@/modules/firebase/components/Login';
import { Seo } from '@/uiCore/components/Seo';

export const UsersPage = () => {
  const { me } = useMe();

  return (
    <>
      <Seo
        title="My Account"
        description="Your Green Place account."
        path="/user"
        noindex
      />
      <MainLayout>
        {me ? <UserProfile user={me as UsersPermissionsMe} /> : <Login />}
      </MainLayout>
    </>
  );
};

export default UsersPage;
