import { forwardRef } from 'react';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import { MailForm } from '../MailForm';
import { theme } from '@/styles/theme';

export interface IMailFormFooterProps {
  variant?: 'primary' | 'secondary';
}

export const MailFormFooter = forwardRef<HTMLElement, IMailFormFooterProps>((props, _) => {
  const mdScreen = useMediaQuery(`(min-width:${theme.breakpoints.values.md}px)`);

  return (
    <Box
      display="flex"
      justifyContent="center"
      bgcolor={theme.palette.green.background}
      padding="35px 16px 60px 16px"
      sx={{
        backgroundImage: 'radial-gradient(#e8ffde 20%, transparent 20%), radial-gradient(#FAFAFA 20%, transparent 20%)',
        backgroundPosition: '0 0, 30px 30px',
        backgroundSize: '30px 30px',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant="h2"
            fontFamily={theme.typography.fontFamily}
            color={theme.palette.green.secondary}
            fontSize={mdScreen ? '28px' : 'unset'}
            lineHeight={mdScreen ? 1.2 : 'unset'}
            pb="35px"
            align="center"
          >
            Stay ahead of the curve!
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box ml="auto">
            <MailForm variant="primary" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

MailFormFooter.displayName = 'MailFormFooter';
