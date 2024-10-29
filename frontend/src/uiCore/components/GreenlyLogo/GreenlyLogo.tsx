import Image from 'next/image';
import { styled } from '@mui/system';
import Logo from './logo.png';
import { theme } from '@/styles/theme';

const LogoContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  position: 'relative',
  width: '338px',
  height: '54px',
  marginTop: '7px',
  marginBottom: '7px',

  [theme.breakpoints.down('lg')]: {
    width: 200,
    height: 46,
  },

  [theme.breakpoints.down('md')]: {
    width: 80,
    height: 36,
  },
}));

export const GreenlyLogo = () => {
  return (
    <LogoContainer>
      <Image
        src={Logo}
        alt="greenly-logo"
        fill={true}
        priority={true}
        style={{
          borderRadius: '6px',
        }}
      />
    </LogoContainer>
  );
};
