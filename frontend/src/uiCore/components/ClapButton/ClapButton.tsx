import { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

import { ClapBorder, Clap } from '../Icons';
import { AuthModal } from '../AuthModal';
import { useMe } from '@/modules/hooks/useMe';
import { theme } from '@/styles/theme';

export type ClapButtonProps = {
  userId?: string;
  articleId: string;
  myClaps: boolean;
  clapsCount: number;
};

export const ADD_CLAP = gql`
  mutation AddClap($articleId: ID!) {
    addClap(articleId: $articleId) {
      id
      attributes {
        myClap
      }
    }
  }
`;

export const REMOVE_CLAP = gql`
  mutation RemoveClap($articleId: ID!) {
    removeClap(articleId: $articleId) {
      id
      attributes {
        myClap
      }
    }
  }
`;

export const ClapButton = (props: ClapButtonProps) => {
  const { userId, articleId, myClaps, clapsCount } = props;
  const { me } = useMe();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const [addArticleClap] = useMutation(ADD_CLAP);
  const [removeArticleClap] = useMutation(REMOVE_CLAP);

  const handleClapAction = () => {
    if (myClaps) {
      removeArticleClap({
        variables: { articleId: articleId },
        refetchQueries: [],
      });
    } else {
      addArticleClap({
        variables: { articleId: articleId },
      });
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        disabled={articleId === '0'}
        onClick={!me ? handleOpen : handleClapAction}
        aria-label="Clap"
        style={{ color: theme.palette.green.icon }}
      >
        {myClaps ? <Clap /> : <ClapBorder />}
      </IconButton>
      <Typography variant="caption" color={theme.palette.green.icon}>
        {clapsCount}
      </Typography>
      <AuthModal handleClose={handleClose} open={open} />
    </>
  );
};
