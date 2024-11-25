import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { theme } from '@/styles/theme';
import Link from 'next/link';

export const ContributeContainer = styled('div')(() => ({
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
    padding: '0px 0px 30px 0px',
  },
}));

export const Contribute = () => {
  return (
    <ContributeContainer>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" className={'headerText'} align="center">
              Write For Us!
            </Typography>
            <Typography variant="h5" className={'bodyText'} align="center">
              Got something to share?
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className={'bodyText'} align="center">
              Check out our{' '}
              <Link
                href="/write-for-us"
                style={{
                  textDecoration: 'underline',
                  color: theme.palette.green.primary,
                }}
              >
                writing guidelines
              </Link>{' '}
              and publish your work on Green Place
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ContributeContainer>
  );
};
