import { LinearProgress, Container, Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { theme } from '@/styles/theme';
import { AuthorCard } from '@/uiCore/components/AuthorCard';
import { useGetTeamMembersQuery } from '../graphql/query/__generated__/getTeamMembers';

export const TeamContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.white,

  '& .headerText': {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '50px 0px 30px 0px',
  },

  '& .members': {
    padding: '0px 0px 80px 0px',
  },

  '& .bodyText': {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '0px 0px 60px 0px',
  },
}));

export interface ITeamProps {
  variant: 'primary' | 'secondary';
}

export interface Author {
  id?: string | null;
  name?: string | null;
  displayName?: string | null;
  bio?: string | null;
  profilePicture?: string | null;
  profileLink?: string | null;
}

export const Team = (props: ITeamProps) => {
  const { data, loading, error } = useGetTeamMembersQuery({
    variables: {
      pagination: {
        limit: -1,
      },
      filters: {
        role: { name: { eq: 'ADMIN' } },
      },
    },
  });

  if (error) {
    console.log(error);
    return <p> Error fetching team members </p>;
  }
  if (loading) {
    return <LinearProgress color="secondary" />;
  }
  const teamData = data?.usersPermissionsUsers?.data;
  const teamMembers = teamData?.map(({ attributes }) => {
    const author = {
      id: attributes?.extId,
      bio: attributes?.bio,
      displayName: attributes?.displayName,
      profilePicture: attributes?.profilePicture,
      name: attributes?.name,
      profileLink: attributes?.profileLink,
    };
    return <AuthorCard key={author.id} variant="primary" size={6} data={author} />;
  });

  return (
    <TeamContainer>
      <Box display="flex" justifyContent="center">
        <Container maxWidth="xl">
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h1" className={'headerText'} align="center">
                Our Team
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5" className={'bodyText'} align="center">
                Green Place was started by a group of Wesleyan University alumni
                in 2020. Concerned about the direction the climate change
                conversation was heading in, we realized there wasn’t a singular
                platform where people could discuss the future of our planet. We
                decided to change that. What started out as a group of four
                passionate friends we hope will one day expand to millions of
                people across the globe.
              </Typography>
            </Grid>
            <Grid container className={'members'} spacing={5}>
              {teamMembers}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </TeamContainer>
  );
};
