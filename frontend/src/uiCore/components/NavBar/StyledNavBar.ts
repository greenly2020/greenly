import { styled } from '@mui/system';
import { theme } from '@/styles/theme';

export const StyledNavBar = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.gray.primary,
  height: 'auto',
  '& .noPadding': {
    padding: '0px',
  },

  '& .navbarText': {
    display: 'block',
    paddingLeft: '15px',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  '& .rightContainer': {
    marginLeft: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',

    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      paddingLeft: '10px',
    },
  },
  '& .submitButtonLink': {
    color: theme.palette.gray.primary,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  '& .submitButtonText': {
    marginRight: '10px',
    padding: '2px 5px 2px 5px',
    border: '2px solid',
    borderRadius: '5px',
  },
  '& .submitButton': {
    padding: 0,

    [theme.breakpoints.down('sm')]: {
      '&.MuiButtonBase-root': {
        display: 'none',
      },
    },
  },
  '& .loginText': {
    paddingLeft: '10px',
  },
  '& .navbarIcon': {
    color: theme.palette.gray.primary,
    margin: 'auto 10px auto 10px',
  },
  '& .mobileVisible': {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));
