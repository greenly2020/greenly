import { useState, forwardRef, useCallback, use } from 'react';
import { gql, useMutation } from '@apollo/client';

import { AuthModal } from '../AuthModal';
import { useMe } from '../../../modules/hooks/useMe';
import { IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { theme } from '@/styles/theme';

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
        style={{ color: theme.palette.green.icon }}
      >
        {liked ? <Star /> : <StarBorder />}
      </IconButton>
      <AuthModal handleClose={handleClose} open={open} />
    </>
  );
};
