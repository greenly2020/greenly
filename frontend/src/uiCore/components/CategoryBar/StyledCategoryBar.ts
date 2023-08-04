import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledCategoryBarBox = styled(Box)(() => ({
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&::-webkit-scrollbar': {
      height: '6px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'white',
      height: '6px',
      borderBottomRightRadius: '5px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eee',
      borderRadius: '9px',
      height: '6px',
    },
}));