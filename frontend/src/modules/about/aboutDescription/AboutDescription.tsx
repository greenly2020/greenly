import { styled } from '@mui/system';

import { theme } from '@/styles/theme';
import { Box, Grid, Typography } from '@mui/material';

export const AboutDescriptionContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.gray.background,

  '& .headerText': {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '30px 0px 30px 0px',
  },
  '& .bodyText': {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '0px 0px 60px 0px',
  },
}));

export interface IAboutDescriptionProps {
  variant: 'primary' | 'secondary';
}

export const AboutDescription = (props: IAboutDescriptionProps) => {
  return (
    <AboutDescriptionContainer>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" className={'headerText'} align="center">
              About Us
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className={'bodyText'} align="center">
              Greenly is designed for environmentalists and climate change activists to come together and discuss the
              future of our planet. Whether you’re here to read, write, or join in on the conversation, all are welcome.
              Greenly is a place where great minds of the present can chat with the budding young leaders of the future.
              Come join the Green Revolution.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </AboutDescriptionContainer>
  );
};
