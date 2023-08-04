import { styled } from '@mui/system';

import { theme } from '@/styles/theme';

export const StyledSearchContainer = styled('div')(() => ({
  backgroundColor: '#EEEEEE',
  marginTop: '20px',

  '& .buttonHolder': {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '25px',
  },
  '& .errorText': {
    paddingTop: '50px',
    marginTop: '-20px',
    marginBottom: '50px',

    [theme.breakpoints.down('md')]: {
      paddingTop: '30px',
      marginTop: '-20px',
      marginBottom: '30px',
    },
  },
}));
