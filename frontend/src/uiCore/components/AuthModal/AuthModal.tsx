import { forwardRef } from 'react';
import Link from 'next/link';
import { Box, Typography, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { theme } from '@/styles/theme';
import { Button } from '../Button';

export interface IAuthModalProps {
  handleClose: () => void;
  open: boolean;
}

const AuthModal = (props: IAuthModalProps) => {
  const { handleClose, open } = props;

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box
        position="absolute"
        component="div"
        top="50%"
        left="50%"
        maxWidth="300px"
        width="100%"
        boxShadow="0 0 10px rgba(0,0,0,.5)"
        borderRadius="10px"
        height="200px"
        padding="10px"
        display="flex"
        gap="10px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: theme.palette.common.white,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box position="absolute" right={10} top={10} onClick={handleClose}>
          <CloseIcon />
        </Box>
        <Typography variant="h5" component="h5" textAlign="center" fontWeight={theme.typography.fontWeightBold}>
          You must be signed in to use this feature
        </Typography>
        <Link
          href={'/auth'}
          style={{
            color: theme.palette.common.white,
          }}
        >
          <Button
            label="loginButton"
            sx={{
              border: `1px solid ${theme.palette.green.secondary}`,
              '&:hover': {
                color: theme.palette.green.secondary,
                backgroundColor: theme.palette.common.white,
              },
            }}
          >
            LOGIN
          </Button>
        </Link>
      </Box>
    </Modal>
  );
};

AuthModal.displayName = 'AuthModal';

export { AuthModal };
