import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Share } from '@mui/icons-material';
import { theme } from '@/styles/theme';
import { ShareModal } from '../ShareModal';
import { ShareIcon } from '../Icons/ShareIcon';

interface ShareButtonProps {
  url: string;
  title: string;
}

function ShareButton({ url, title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShare = () => {
    handleOpen();
    if (navigator.share) {
      navigator
        .share({
          title,
          url,
        })
        .then((data) => console.log('Shared successfully!', data))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      setShareLink(`${process.env.BASE_URL}articles/${url}`);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleShare}
        aria-label="Share"
        sx={{
          padding: '6px',
          color: theme.palette.green.icon,
          '& .share-icon .share-icon-path': {
            fill: '#fff',
            transition: 'fill 0.1s ease-in',
          },
          '&:hover': {
            bgcolor: 'unset',
            '& .share-icon .share-icon-path': {
              fill: '#c2ffc0',
            },
          },
        }}
      >
        <ShareIcon />
      </IconButton>
      <ShareModal
        handleClose={handleClose}
        open={open}
        shareLink={shareLink}
        setShareLink={setShareLink}
      />
    </>
  );
}

export default ShareButton;
