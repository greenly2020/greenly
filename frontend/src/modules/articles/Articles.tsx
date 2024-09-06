import React, { useEffect, useState } from 'react';

import {
  Box,
  Grid,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { ArticleEntity } from '@/__generated__/types';
import { ArticleCard } from '@/uiCore';
import { usePagination } from '../hooks/usePagination/usePagination';
import { StyledArticlesContainer } from './StyledArticlesContainer';
import { useGetArticlesListQuery } from './graphql/query/__generated__/getArticlesList';

const ITEMS_PER_PAGE = 9;

export default function Articles() {
  const [articles, setArticles] = useState<JSX.Element[]>([]);

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
        reviewed: { eq: true },
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const articlesList = articlesData?.articles?.data;

  const { currentData, currentPage, jump, maxPage } = usePagination({
    data: articlesList || [],
    pageSize: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (currentData.length === 0) {
      jump(1);
    }

    if (currentData.length > 0) {
      const articles = currentData?.map((article: ArticleEntity) => {
        return (
          <ArticleCard
            key={article?.id ? article.id : Math.random().toString()}
            cardData={article}
          />
        );
      });
      setArticles(articles);
    }
  }, [currentData, jump]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    jump(value);
  };

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
  return articles ? (
    <StyledArticlesContainer>
      <Container maxWidth="xl">
        <Typography component="h1" display="none">
          Greenly - Front page of the green revolution.
        </Typography>
        <Box pb={3}>
          {articles?.length === 0 && (
            <Typography variant={'h3'} className={'errorText'}>
              There are no articles here, try an earlier page!
            </Typography>
          )}
          <Grid container spacing={3}>
            {articles}
          </Grid>
        </Box>
        <div className={'buttonHolder'}>
          <Pagination
            size="large"
            count={maxPage}
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </Container>
    </StyledArticlesContainer>
  ) : null;
}
