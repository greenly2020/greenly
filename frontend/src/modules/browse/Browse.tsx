import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, LinearProgress, Typography, Pagination } from '@mui/material';
// import { ArticleCard } from 'uiCore/components/ArticleCard/index';

import { usePagination } from '../hooks/usePagination/usePagination';
import { ArticleEntity } from '@/__generated__/types';
import { StyledBrowseContainer } from './StyledBrowseContainer';
import { useGetArticlesListQuery } from '../articles/graphql/query/__generated__/getArticlesList';
import { ArticleCard } from '@/uiCore';

const ITEMS_PER_PAGE = 9;

interface BrowseParams {
  category: string;
}

function Browse({ category }: BrowseParams) {
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
      filters: {
        category: { eq: category },
        reviewed: { eq: true },
      },
      sort: ['dateCreated:DESC'],
    },
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
        return <ArticleCard key={article?.id ? article.id : Math.random().toString()} cardData={article} />;
      });
      setArticles(articles);
    }
  }, [currentData, jump]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    jump(value);
  };

  if (articlesError?.message) {
    return <p> {articlesError?.message} </p>;
  }
  if (articlesLoading) {
    return <LinearProgress color="secondary" />;
  }

  const totalArticles = articlesList?.length;

  return (
    <StyledBrowseContainer>
      <Container maxWidth="xl">
        <Box pb={3}>
          {currentData.length === 0 && (
            <Typography variant="h3" className={'errorText'}>
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
            hideNextButton={totalArticles ? totalArticles / ITEMS_PER_PAGE <= 1 : true}
            count={maxPage}
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </Container>
    </StyledBrowseContainer>
  );
}

export default Browse;
