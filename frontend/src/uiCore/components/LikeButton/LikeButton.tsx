import { useState, forwardRef, useCallback, use } from 'react';
import { gql, useMutation } from '@apollo/client';

import { AuthModal } from '../AuthModal';
import { useMe } from '../../../modules/hooks/useMe';
import { IconButton } from '@mui/material';
import { theme } from '@/styles/theme';
import { StarIcon } from '../Icons/StarIcon';
import { StarActiveIcon } from '../Icons/StarActiveIcon';

export type LikeButtonProps = {
  liked: boolean;
  articleId: string;
};

export const ADD_LIKE = gql`
  mutation AddLike($article: ID!) {
    addLike(articleId: $article) {
      id
      attributes {
        myLike
      }
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation RemoveLike($article: ID!) {
    removeLike(articleId: $article) {
      id
      attributes {
        myLike
      }
    }
  }
`;

export const LikeButton = (props: LikeButtonProps) => {
  const { articleId, liked } = props;
  const { me } = useMe();

  const [open, setOpen] = useState(false);

  const [addLikedArticle] = useMutation(ADD_LIKE);
  const [removeLikedArticle] = useMutation(REMOVE_LIKE);

  const changeLike = () => {
    if (liked) {
      removeLikedArticle({
        variables: { article: articleId },
      });
    } else {
      addLikedArticle({
        variables: { article: articleId },
      });
    }
  };

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <IconButton
        disabled={articleId === '0'}
        onClick={!me ? handleOpen : changeLike}
        aria-label="Like"
        sx={{
          color: theme.palette.green.icon,
          '& .star-icon .star-icon-path': {
            fill: '#fff',
            transition: 'fill 0.1s ease-in',
          },
          '&:hover': {
            bgcolor: 'unset',
            '& .star-icon .star-icon-path': {
              fill: '#c2ffc0',
            },
          },
        }}
      >
        {liked ? <StarActiveIcon /> : <StarIcon />}
      </IconButton>
      <AuthModal handleClose={handleClose} open={open} />
    </>
  );
};
