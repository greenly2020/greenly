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
import { SOCIAL_LINKS } from '@/config/socialLinks';

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
              {SOCIAL_LINKS.facebook && (
                <Grid item>
                  <LinkMui href={SOCIAL_LINKS.facebook} target="_blank">
                    <StyledCircleDiv>
                      <StyledFacebookIcon />
                    </StyledCircleDiv>
                  </LinkMui>
                </Grid>
              )}

              {SOCIAL_LINKS.twitter && (
                <Grid item>
                  <LinkMui href={SOCIAL_LINKS.twitter} target="_blank">
                    <StyledCircleDiv>
                      <StyledTwitterIcon />
                    </StyledCircleDiv>
                  </LinkMui>
                </Grid>
              )}

              {SOCIAL_LINKS.linkedin && (
                <Grid item>
                  <LinkMui href={SOCIAL_LINKS.linkedin} target="_blank">
                    <StyledCircleDiv>
                      <StyledLinkedInIcon />
                    </StyledCircleDiv>
                  </LinkMui>
                </Grid>
              )}

              {SOCIAL_LINKS.instagram && (
                <Grid item>
                  <LinkMui href={SOCIAL_LINKS.instagram} target="_blank">
                    <StyledCircleDiv>
                      <StyledInstagramIcon />
                    </StyledCircleDiv>
                  </LinkMui>
                </Grid>
              )}
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
