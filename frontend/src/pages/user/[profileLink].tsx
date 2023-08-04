import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, LinearProgress, Typography } from '@mui/material';

import { UserProfile } from '@/modules/user';
import { MainLayout } from '@/layout/MainLayout';
import { useProfile } from '@/modules/hooks/useProfile';

export const UserPage = () => {
  const { query } = useRouter();

  const link = query.profileLink as string;

  const { error, loading, user } = useProfile(link);

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography> Something went wrong please try again. </Typography>
      </Container>
    );
  }

  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  if (!user) {
    return (
      <div>
        <Typography> The user you are looking for does not exist. Please try a new one. </Typography>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{user.name || 'Greenly'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={user.bio || ""} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <UserProfile user={user} />
      </MainLayout>
    </>
  );
};

export default UserPage;
