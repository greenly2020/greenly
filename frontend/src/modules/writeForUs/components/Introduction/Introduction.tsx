import classNames from 'classnames';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '@/styles/theme';

const StyledIntroductionContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  padding: '30px 0px 30px 0px',
  backgroundColor: theme.palette.gray.background,

  '& .headerText': {
    paddingBottom: '50px',
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
  },
  '& .bodyText': {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Introduction = () => {
  return (
    <StyledIntroductionContainer>
      <Box display="flex" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h1" className={'headerText'} align="center">
              Green Place is the front page of the Green Revolution.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className={'bodyText'} align="center">
              Green Place is a selective online environmental publication that
              provides a forum for readers, writers, experts, students, and
              everyone in-between to discuss the topics at the forefront of our
              collective concerns. As a writer, you’ll be able to use Green
              Place to share your knowledge with readers around the world. Your
              article will be reviewed and edited by real environmentalists. So
              submit an article to join the conversation and help shape the
              future of our planet.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </StyledIntroductionContainer>
  );
};

export default Introduction;
