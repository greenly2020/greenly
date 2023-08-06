import Image from 'next/image';
import { styled } from '@mui/system';
import Logo from './logo.png';
import { theme } from '@/styles/theme';

const LogoContainer = styled('div')(() => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightBold,
  position: 'relative',
  width: '200px',
  height: '54px',
  marginTop: '7px',
  marginBottom: '7px',

  [theme.breakpoints.down('lg')]: {
    width: 160,
    height: 46,
  },

  [theme.breakpoints.down('md')]: {
    width: 120,
    height: 36,
  },

  [theme.breakpoints.down('sm')]: {
    width: 90,
    height: 25,
  },
}));

export const GreenlyLogo = () => {
  return (
    <LogoContainer>
      <Image alt="greenly-logo" fill={true} sizes="200px" src={Logo} priority={true} />
    </LogoContainer>
  );
};
