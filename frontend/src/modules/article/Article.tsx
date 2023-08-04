import { useRouter } from 'next/router';
import { Box, Container, LinearProgress, Typography } from '@mui/material';

import { theme } from '@/styles/theme';
import { InProgress } from '@/uiCore/components/InProgress';
import { ArticleBody } from '@/uiCore/components/ArticleBody';
import { ArticleFooter } from '@/uiCore/components/ArticleFooter';
import { useGetArticleByLinkQuery } from './graphql/query/__generated__/getArticleByLink';

const Article = () => {
  const { query } = useRouter();
  const articleLink = query.articleLink as string;

  const { data, loading, error } = useGetArticleByLinkQuery({
    variables: {
      articleLink,
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });
  const articleData = data?.articleByLink?.data;

  if (!articleData || loading) {
    return (
      <div data-testid="article-loading">
        <LinearProgress color="secondary" />
      </div>
    );
  }
  if (error) {
    return <InProgress variant="primary" />;
  }
  return articleData ? (
    <Box data-testid="article-container" bgcolor={theme.palette.gray.background}>
      <ArticleBody article={articleData} />
      <ArticleFooter authorId={articleData?.attributes?.author?.data?.id?.toString() || ''} />
    </Box>
  ) : (
    <Container maxWidth="sm" data-testid="not-found">
      <Typography>The article you are looking for does not exist. Please try a new one. </Typography>
    </Container>
  );
};

export default Article;
