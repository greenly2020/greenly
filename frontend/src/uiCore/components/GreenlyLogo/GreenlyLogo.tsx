import Image from 'next/image';
import { styled } from '@mui/system';
import Logo from './logo.png';
import { theme } from '@/styles/theme';

const LogoContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  position: 'relative',
  width: '338px',
  aspectRatio: '338 / 100',
  marginTop: '7px',
  marginBottom: '7px',

  [theme.breakpoints.down('lg')]: {
    width: 200,
  },

  [theme.breakpoints.down('md')]: {
    width: 80,
  },
}));

export const GreenlyLogo = () => {
  return (
    <LogoContainer>
      <Image
        src={Logo}
        alt="greenly-logo"
        fill
        priority
        style={{
          borderRadius: '6px',
          objectFit: 'contain',
        }}
      />
    </LogoContainer>
  );
};
