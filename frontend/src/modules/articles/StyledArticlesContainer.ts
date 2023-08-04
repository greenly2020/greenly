import { styled } from '@mui/system';

export const StyledArticlesContainer = styled('div')(() => ({
  backgroundColor: '#EEEEEE',
  display: 'flex',
  padding: '12px',

  '& .buttonHolder': {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '25px',
  },
  '& .errorText': {
    paddingTop: '50px',
    marginTop: '-20px',
    marginBottom: '50px',
  },
}));
