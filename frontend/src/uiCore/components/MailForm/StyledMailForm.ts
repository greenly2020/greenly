import { theme } from '@/styles/theme';
import { styled } from '@mui/system';

export const StyledMailFormInput = styled('input')(() => ({
  height: '50px',
  width: '100%',
  boxSizing: 'border-box',
  border: 'none',
  borderTopLeftRadius: '5px',
  borderBottomLeftRadius: '5px',
  '&::placeholder': {
    color: '#002d15',
  },
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '18px',
  lineHeight: 'normal',
  fontWeight: theme.typography.fontWeightRegular,
  outline: 'none',
}));
