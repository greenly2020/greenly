import Head from 'next/head';

import { UserProfile } from '@/modules/user';
import { useMe } from '@/modules/hooks/useMe';
import { MainLayout } from '@/layout/MainLayout';
import { UsersPermissionsMe } from '@/__generated__/types';
import { Login } from '@/modules/firebase/components/Login';

export const UsersPage = () => {
  const { me } = useMe();

  return (
    <>
      <Head>
        <title>Greenly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>{me ? <UserProfile user={me as UsersPermissionsMe} /> : <Login />}</MainLayout>
    </>
  );
};

export default UsersPage;
