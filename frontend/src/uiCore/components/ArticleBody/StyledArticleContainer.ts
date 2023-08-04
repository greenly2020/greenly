import { Box, styled } from '@mui/material';
import { theme } from '@/styles/theme';

export const StyledArticleContainer = styled(Box)(() => ({
  backgroundColor: 'white',
  position: 'relative',
  borderRadius: 20,
  border: '2px solid white',
  zIndex: 1,
  padding: 50,
  overflowWrap: 'break-word',
  margin: 'auto',
  marginTop: '-300px',

  [theme.breakpoints.down('sm')]: {
    padding: 20,
    borderRadius: 0,
    border: 'none',
  },

  '& .wrapperHidden': {
    border: '1px solid white',
    backgroundColor: 'white',
    fontSize: '16px',
  },
  '& .editorHidden': {
    padding: '1rem',
    lineHeight: '25px',
  },
}));
