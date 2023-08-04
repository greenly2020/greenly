import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { theme } from '@/styles/theme';

export const ContactContainer = styled('div')(() => ({
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

export interface IContactFooterProps {
  variant: 'primary' | 'secondary';
}

export const ContactFooter = (props: IContactFooterProps) => {
  return (
    <ContactContainer>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" className={'headerText'} align="center">
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={'bodyText'} align="center">
              Send an email to{' '}
              <Link
                href="mailto:ted@greenly.co"
                color="inherit"
                target="_blank"
                style={{ color: theme.palette.green.primary }}
              >
                ted@greenly.co
              </Link>
              !
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={'bodyText'} align="center">
              Download our press kit{' '}
              <Link
                href="https://firebasestorage.googleapis.com/v0/b/greenly-b5548.appspot.com/o/static%2Fone-pager%2FOnePager.pdf?alt=media&token=bbd0c580-2674-4e85-8ca0-321fcf26bace"
                target="_blank"
                style={{ textDecoration: 'underline', color: theme.palette.green.primary }}
              >
                here
              </Link>
              .
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ContactContainer>
  );
};
