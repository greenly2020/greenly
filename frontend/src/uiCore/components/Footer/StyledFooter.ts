import { theme } from '@/styles/theme';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled as styledCore } from '@mui/material';

export const StyledFooter = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.green.category,
  color: theme.palette.green.accentLight,
  '& .text': {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.green.accentLight,
  },
  '& .link': {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export const StyledCircleDiv = styled('div')(() => ({
  width: '45px',
  height: '45px',
  border: 'solid 2.6px ' + theme.palette.green.accentLight,
  borderRadius: '50%',
  textAlign: 'center',
  verticalAlign: 'middle',
  margin: '20px',
  justifyContent: 'center',
}));

export const StyledFacebookIcon = styledCore(FacebookIcon)(() => ({
  color: theme.palette.green.accentLight,
  paddingTop: '6px',
  fontSize: '32px',
}));

export const StyledLinkedInIcon = styledCore(LinkedInIcon)(() => ({
  color: theme.palette.green.accentLight,
  paddingTop: '6px',
  fontSize: '32px',
}));

export const StyledInstagramIcon = styledCore(InstagramIcon)(() => ({
  color: theme.palette.green.accentLight,
  paddingTop: '6px',
  fontSize: '32px',
}));

export const StyledTwitterIcon = styledCore(TwitterIcon)(() => ({
  color: theme.palette.green.accentLight,
  paddingTop: '6px',
  fontSize: '32px',
}));
