import React from 'react';

import { Box, Grid, Container, LinearProgress, Typography } from '@mui/material';
import { ArticleCard } from '@/uiCore';
import { UserProfileType } from '../hooks/useProfile';
import { theme } from '@/styles/theme';
import { useGetArticlesListQuery } from './graphql/query/__generated__/getArticlesList';
import { useMyLikedArticlesQuery } from './graphql/query/__generated__/getMyLikedArticlesList';

export default function UserArticles({
  userId,
  withLikes,
  noTitle,
}: {
  userId: string;
  withLikes?: boolean;
  noTitle?: boolean;
}) {
  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useGetArticlesListQuery({
    variables: {
      pagination: {
        limit: -1,
      },
      sort: ['dateCreated:DESC'],
      filters: {
        author: { id: { eq: userId } },
        reviewed: { eq: true },
      },
    },
    skip: withLikes,
  });
  const { data: likedArticlesData } = useMyLikedArticlesQuery({
    variables: {
      pagination: {
        limit: -1,
      },
      sort: ['dateCreated:DESC'],
    },
    skip: !withLikes,
  });

  const articlesList = withLikes ? likedArticlesData?.myLikedArticles?.data : articlesData?.articles?.data;

  if (articlesError) {
    return (
      <Container maxWidth="sm">
        <Typography> Something went wrong please try again. </Typography>
      </Container>
    );
  }
  if (articlesLoading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <Box maxWidth="1140px" width="100%" pb={3} px={3} margin="auto">
      {articlesList?.length === 0 && !withLikes ? (
        <Typography variant={'h3'} className={'errorText'}>
          There are no articles here, try an earlier page!
        </Typography>
      ) : (
        <>
          {!noTitle && (
            <Container maxWidth="sm">
              <Typography
                variant="h1"
                align="center"
                color="#002d15"
                // TODO add fontFamily
                fontFamily="serif"
                fontWeight={theme.typography.fontWeightBold}
              >
                {withLikes ? `Favorite Articles` : `Author's Articles`} ({articlesList?.length})
              </Typography>
            </Container>
          )}
          <Grid container spacing={3} py={6}>
            {articlesList?.map(article => {
              return <ArticleCard key={article?.id ? article.id : Math.random().toString()} cardData={article} />;
            })}
          </Grid>
        </>
      )}
    </Box>
  );
}
