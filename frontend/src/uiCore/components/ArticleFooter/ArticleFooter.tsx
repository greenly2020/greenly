import React, { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

import { theme } from '@/styles/theme';
import UserArticles from '@/modules/articles/UserArticles';

export interface IArticleFooterProps {
  authorId: string;
}

export const ArticleFooter = forwardRef<HTMLElement, IArticleFooterProps>((props, ref) => {
  const { authorId } = props;

  return (
    <Box pt={3} textAlign="center" width="100%" pb={6}>
      <Typography
        // fontFamily="AvenirNext-DemiBold"
        // TODO: Add correct fontFamily
        fontFamily="serif"
        color={theme.palette.green.category}
        variant="h1"
        my={3}
      >
        More From This Author
      </Typography>
      <UserArticles userId={authorId} noTitle />
    </Box>
  );
});

ArticleFooter.displayName = 'ArticleFooter';
