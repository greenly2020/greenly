import { Box, Grid, Container, LinearProgress, Typography, Pagination } from '@mui/material';

import { ArticleCard } from '@/uiCore/components/ArticleCard/index';
import { useGetArticlesListQuery } from '../articles/graphql/query/__generated__/getArticlesList';
import { theme } from '@/styles/theme';
import { useState } from 'react';

export default function ReviewQueue() {
  const [page, setPage] = useState(1);

  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useGetArticlesListQuery({
    variables: {
      pagination: {
        page: page,
        pageSize: 9,
      },
      filters: {
        reviewed: { eq: false },
      },
      sort: ['dateCreated:DESC'],
    },
  });
  const articlesList = articlesData?.articles?.data;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (articlesError) {
    return <p> {articlesError?.message} </p>;
  }
  if (articlesLoading) {
    return <LinearProgress color="secondary" />;
  }
  const articleCount = articlesData?.articles?.meta?.pagination?.total || 0;
  const articles = articlesList?.map(article => {
    return <ArticleCard cardData={article} key={article.id} />;
  });

  return (
    <Box bgcolor={theme.palette.gray.background}>
      <Container maxWidth="xl">
        <Container maxWidth="sm">
          <Typography
            variant="h6"
            // TODO Add correct fontFamily
            fontFamily="serif"
            color="#002d15"
            fontSize="48px"
            mb="20px"
            align="center"
          >
            Articles To Review
          </Typography>
        </Container>
        {articleCount === 0 ? (
          <Box pb={3}>
            <Typography variant="h3" pt="50px" mt="-20px" mb="50px">
              {' '}
              There are no articles here, try an earlier page!{' '}
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={5}>
              {articles}
            </Grid>
            <Box display="flex" justifyContent="center" pb="25px">
              {articleCount / 9 <= 1 && (
                <Pagination
                  size="large"
                  hideNextButton
                  count={Math.ceil(articleCount / 9)}
                  page={page}
                  onChange={handleChange}
                />
              )}
              {articleCount / 9 > 1 && (
                <Pagination size="large" count={Math.ceil(articleCount / 9)} page={page} onChange={handleChange} />
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
