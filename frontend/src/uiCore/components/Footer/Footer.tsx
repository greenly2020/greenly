import { Container, Box, Grid, Link as LinkMui, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import {
  StyledCircleDiv,
  StyledFacebookIcon,
  StyledFooter,
  StyledInstagramIcon,
  StyledLinkedInIcon,
  StyledTwitterIcon,
} from './StyledFooter';
import Link from 'next/link';

export interface IFooterProps {
  variant?: 'primary' | 'secondary';
}

export const Footer = forwardRef<HTMLElement, IFooterProps>((props, _) => {
  return (
    <StyledFooter>
      <Container>
        <Box pt={5} pb={6}>
          <Box>
            <Grid container justifyContent="center">
              <Grid item>
                <LinkMui href="https://www.facebook.com/webelieveingreen" target="_blank">
                  <StyledCircleDiv>
                    <StyledFacebookIcon />
                  </StyledCircleDiv>
                </LinkMui>
              </Grid>

              <Grid item>
                <LinkMui href="https://twitter.com/greenly_co" target="_blank">
                  <StyledCircleDiv>
                    <StyledTwitterIcon />
                  </StyledCircleDiv>
                </LinkMui>
              </Grid>

              <Grid item>
                <LinkMui href="https://www.linkedin.com/company/greenlyco/" target="_blank">
                  <StyledCircleDiv>
                    <StyledLinkedInIcon />
                  </StyledCircleDiv>
                </LinkMui>
              </Grid>

              <Grid item>
                <LinkMui href="https://www.instagram.com/greenly_co/" target="_blank">
                  <StyledCircleDiv>
                    <StyledInstagramIcon />
                  </StyledCircleDiv>
                </LinkMui>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography className={'text'}>
                  <Link href="/about" color="inherit" className={'text link'}>
                    About Us
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
});

Footer.displayName = 'Footer';
