import { useMe } from '@/modules/hooks/useMe';
import { Login } from '@/modules/firebase/components/Login';

import { MainLayout } from '@/layout/MainLayout';
import { useRouter } from 'next/router';
import { Seo } from '@/uiCore/components/Seo';

export default function Auth() {
  const { me } = useMe();
  const { push, isReady } = useRouter();
  if (isReady && me) {
    push('/');
  }

  return (
    <>
      <Seo
        title="Log In"
        description="Log in to the Green Place."
        path="/auth"
        noindex
      />
      <MainLayout>
        <Login />
      </MainLayout>
    </>
  );
}
