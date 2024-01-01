import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, LinearProgress, Typography } from '@mui/material';

import { UserProfile } from '@/modules/user';
import { MainLayout } from '@/layout/MainLayout';
import { UserProfileType, useProfile } from '@/modules/hooks/useProfile';
import { GetServerSideProps } from 'next';
import { apolloClientServer } from '@/api/apolloClientServer';
import { GetUsersDocument } from '@/modules/user/graphql/query/__generated__/getUsers';

interface userDataProp {
  name?: string;
  bio?: string;
}

export const UserPage = ({ userData }: { userData: userDataProp }) => {
  return (
    <>
      <Head>
        <title>{userData?.name || 'Greenly'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={userData?.bio || ''} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <UserProfile user={userData as UserProfileType} />
      </MainLayout>
    </>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let parsedProfileData: userDataProp = { name: '', bio: '' };
  const profileLink = ctx?.query?.profileLink as string | undefined;
  if (!profileLink) {
    return {
      notFound: true,
    };
  }

  const { data: profileData } = await apolloClientServer.query({
    query: GetUsersDocument,
    variables: {
      filters: {
        profileLink: { eq: profileLink },
      },
    },
  });

  parsedProfileData = {
    ...profileData?.usersPermissionsUsers?.data?.[0]?.attributes,
    id: profileData?.usersPermissionsUsers?.data?.[0]?.id,
    name: profileData?.usersPermissionsUsers?.data?.[0]?.attributes?.name,
    bio: profileData?.usersPermissionsUsers?.data?.[0]?.attributes?.bio,
  };

  return {
    props: {
      userData: parsedProfileData,
    },
  };
};
