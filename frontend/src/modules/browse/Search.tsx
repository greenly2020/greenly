import React from 'react';
import { Box, Grid, Container, LinearProgress, Typography, Pagination } from '@mui/material';

// import { ArticleCard } from 'uiCore/components/ArticleCard/index';
import { ArticleEntity } from '@/__generated__/types';
import { StyledBrowseContainer } from './StyledBrowseContainer';
import { useGetArticlesListQuery } from '../articles/graphql/query/__generated__/getArticlesList';
import { ArticleCard } from '@/uiCore';

interface SearchParams {
  term: string;
}

function Search({ term }: SearchParams) {
  const [page, setPage] = React.useState(1);

  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useGetArticlesListQuery({
    variables: {
      pagination: {
        page: page,
        pageSize: 36,
      },
      filters: {
        or: [
          { title: { containsi: term } },
          {
            author: {
              name: { containsi: term },
            },
          },
        ],
        reviewed: { eq: true },
      },
      sort: ['dateCreated:DESC'],
    },
  });
  const articlesList = articlesData?.articles?.data;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (articlesError?.message) {
    return <p> {articlesError?.message} </p>;
  }
  if (articlesLoading) {
    return <LinearProgress color="secondary" />;
  }

  const articleCount = articlesData?.articles?.meta?.pagination?.total || 0;
  const articles = articlesList?.map((article: ArticleEntity) => {
    return <ArticleCard cardData={article} key={article.id} />;
  });

  return (
    <StyledBrowseContainer>
      <Container maxWidth="xl">
        <Typography variant={'h3'} className={'errorText'}>
          {' '}
          Showing results for {term}:{' '}
        </Typography>
        <Box pb={3}>
          {articleCount === 0 && (
            <Typography variant={'h3'} className={'errorText'}>
              {' '}
              There are no articles here, try an earlier page!{' '}
            </Typography>
          )}
          <Grid container spacing={5}>
            {articles}
          </Grid>
        </Box>
        <div className={'buttonHolder'}>
          {articleCount / 36 <= 1 && (
            <Pagination
              size="large"
              hideNextButton
              hidePrevButton
              count={Math.ceil(articleCount / 36)}
              page={page}
              onChange={handleChange}
            />
          )}
          {articleCount / 36 > 1 && (
            <Pagination size="large" count={Math.ceil(articleCount / 36)} page={page} onChange={handleChange} />
          )}
        </div>
      </Container>
    </StyledBrowseContainer>
  );
}

export default Search;
