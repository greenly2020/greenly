import dynamic from 'next/dynamic';
import firebase from 'firebase/compat/app';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import { useRouter } from 'next/router';
import { auth } from '../../firebaseSetup';
import { Box, Container, Typography } from '@mui/material';
import { theme } from '@/styles/theme';

const AuthComponent = dynamic(() => import('react-firebaseui/StyledFirebaseAuth'), { ssr: false });

export const Login = () => {
  const router = useRouter();

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult: firebase.auth.UserCredential): boolean {
        router.push('/');
        return false;
      },
    },
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [GoogleAuthProvider.PROVIDER_ID, EmailAuthProvider.PROVIDER_ID],
  };

  const elements = (
    <Box bgcolor={theme.palette.gray.background} py={3}>
      <Container maxWidth="lg">
        <Typography
          variant={'h2'}
          // fontFamily="AvenirNext-Regular"
          // TODO: Add correct fontFamily
          fontFamily='sans-serif'
          textAlign="center"
        >
          Please Log In or Create an Account Below!
        </Typography>
        <AuthComponent uiConfig={uiConfig} firebaseAuth={auth} />
      </Container>
    </Box>
  );

  return elements;
};
