import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { theme } from '@/styles/theme';
import Link from 'next/link';

export const EditorContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.white,

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

export const GreenlyEditor = () => {
  return (
    <EditorContainer>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Typography variant="h1" className={'headerText'} align="center">
              Become a Green Place Editor!
            </Typography>
            <Typography className={'bodyText'} align="center">
              Be a voice for Green Place in your community! This can be as
              simple as a table at a town fair or a flyer at a coffee shop --
              read more about what it means to be an{' '}
              <Link
                href="/editor"
                target="_blank"
                style={{
                  textDecoration: 'underline',
                  color: theme.palette.green.primary,
                }}
              >
                editor
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </EditorContainer>
  );
};
