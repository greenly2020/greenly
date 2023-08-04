import React from 'react';
import { Box, Grid, Container, LinearProgress, Typography } from '@mui/material';

import { useGetArticlesListQuery } from './graphql/query/__generated__/getArticlesList';
import { ArticleEntity } from '@/__generated__/types';
import { ArticleCard } from '@/uiCore/components/ArticleCard/index';
import { theme } from '@/styles/theme';

export default function TopArticles() {
  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useGetArticlesListQuery({
    variables: {
      pagination: {
        limit: 6,
      },
      sort: ['views:DESC'],
      filters: {
        reviewed: { eq: true },
      },
    },
  });
  const articlesList = articlesData?.articles?.data;

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

  const articles = articlesList?.map((article: ArticleEntity) => {
    return <ArticleCard key={article?.id ? article.id : Math.random().toString()} cardData={article} />;
  });

  return (
    <Box bgcolor={theme.palette.white}>
      <Typography
        variant="h4"
        color={theme.palette.green.category}
        fontWeight={theme.typography.fontWeightBold}
        fontFamily={theme.typography.fontFamily}
        margin="25px"
        align="center"
      >
        Top Articles This Week:
      </Typography>
      <Container maxWidth="xl">
        <Box pb={3}>
          <Grid container spacing={5}>
            {articles}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
