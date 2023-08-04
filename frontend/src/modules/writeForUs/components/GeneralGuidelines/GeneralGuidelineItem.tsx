import { styled } from '@mui/system';
import { Box, Grid, Typography } from '@mui/material';

import { theme } from '@/styles/theme';

type Props = {
  title: string;
  body: string;
  tags?: string[];
  isGray: boolean;
};

const StyledGuidelineItemContainer = styled('div')(() => ({
  '& .titleText': {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
  '& .bodyText': {
    color: theme.palette.green.primary,
    fontWeight: theme.typography.fontWeightRegular,
  },
  '& .guidelineTags': {
    color: theme.palette.green.secondary,
    marginTop: '10px',
    marginRight: '20px',
  },
}));

const GeneralGuidelineItem = ({ title, body, tags, isGray }: Props) => {
  return (
    <StyledGuidelineItemContainer>
      <Box
        display="flex"
        justifyContent="center"
        style={{
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightBold,
          padding: '30px 0px 30px 0px',
          backgroundColor: isGray ? theme.palette.gray.background : 'inherit',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid item xs={12}>
              <Typography variant="h5" className={'titleText'} align="center">
                {title}
              </Typography>
              <Typography className={'bodyText'} align="center">
                {body}
              </Typography>
              {tags && (
                <Grid container justifyContent="center" style={{ marginTop: '20px', textAlign: 'center' }}>
                  {tags.map((tag, index) => {
                    const tagText = tag.split(' ').map(word => {
                      return word[0].toUpperCase() + word.slice(1) + ' ';
                    });
                    return (
                      <Typography key={`${tag}-${index}`} className={'guidelineTags'} align="center">
                        {tagText}
                      </Typography>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </StyledGuidelineItemContainer>
  );
};

export default GeneralGuidelineItem;
