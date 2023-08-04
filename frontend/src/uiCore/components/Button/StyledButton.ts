import { ButtonBase } from '@mui/material';
import { theme } from '@/styles/theme';

import { styled } from '@mui/system';

export const StyledButton = styled(ButtonBase)(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  textAlign: 'center',
  padding: '0 30px',
  borderRadius: '5px',
  color: `${theme.palette.gray.dark}`,
  margin: '5px',
  '&.primary': {
    color: theme.palette.green.accentLight,
    backgroundColor: theme.palette.green.primary,
  },
  '&.secondary': {
    color: theme.palette.green.primary,
    backgroundColor: theme.palette.green.category,
  },
  '&.tertiary': {
    color: theme.palette.gray.dark,
    backgroundColor: theme.palette.gray.divider,
  },

  '&.danger': {
    color: theme.palette.white,
    backgroundColor: '#f53649',
  },
  '&.ghost': {},
}));
