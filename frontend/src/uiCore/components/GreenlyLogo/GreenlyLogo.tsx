import Image from 'next/image';
import { styled } from '@mui/system';
import Logo from './logo.png';
import { theme } from '@/styles/theme';

const LogoContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  position: 'relative',
  width: '54px',
  height: '54px',
  marginTop: '7px',
  marginBottom: '7px',

  [theme.breakpoints.down('lg')]: {
    width: 46,
    height: 46,
  },

  [theme.breakpoints.down('md')]: {
    width: 36,
    height: 36,
  },

  [theme.breakpoints.down('sm')]: {
    width: 25,
    height: 25,
  },
}));

export const GreenlyLogo = () => {
  return (
    <LogoContainer>
      <Image
        src={Logo}
        alt="greenly-logo"
        fill={true}
        sizes="200px"
        priority={true}
        style={{
          borderRadius: '6px',
        }}
      />
    </LogoContainer>
  );
};
