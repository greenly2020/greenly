import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import dateCalculator from '../../../utils/dateCalculator/dateCalculator';
import { LikeButton } from '../LikeButton';
import { ClapButton } from '../ClapButton';
import { Button } from '../Button';
import { getCDNUrl } from '@/modules/firebase/services/storage/storage';
import { useMe } from '@/modules/hooks/useMe';
import { theme } from '@/styles/theme';
import { ArticleEntity } from '@/__generated__/types';
import { StyledArticleContainer } from './StyledArticleContainer';
import ShareButton from '../ShareButton/ShareButton';
import { useDeleteArticleMutation } from '@/modules/article/graphql/mutation/__generated__/delete';
import { useIncrementArticleViewsMutation } from '@/modules/article/graphql/mutation/__generated__/incrementArticleViews';
import { useUpdateArticleMutation } from '@/modules/article/graphql/mutation/__generated__/update';
import { formatProfileLink } from '@/uiCore/utils/utils';

const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

export const ArticleBody = ({ article }: { article: ArticleEntity | null }) => {
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );
  const [editorAbstractState, setEditorAbstractState] = useState<
    EditorState | undefined
  >(undefined);
  const [incrementArticleViewsMutation] = useIncrementArticleViewsMutation();

  const { pathname, push } = useRouter();
  const { me, isAdmin } = useMe();
  const [updateArticle] = useUpdateArticleMutation();

  const abstract = article?.attributes?.abstract;

  useEffect(() => {
    if (article?.attributes?.reviewed) {
      incrementArticleViewsMutation({
        variables: {
          articleId: article?.id as string,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
    setEditorAbstractState(EditorState.createEmpty());
  }, []);

  useEffect(() => {
    if (
      typeof abstract === 'string' &&
      JSON.parse(abstract).blocks[0].text !== ''
    ) {
      setEditorAbstractState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(abstract)))
      );
    }
    if (
      typeof article?.attributes?.articleBody === 'string' &&
      JSON.parse(article?.attributes?.articleBody).blocks !== null
    ) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(article?.attributes?.articleBody || ''))
        )
      );
    }
    if (typeof article?.attributes?.articleBody === 'object') {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(article?.attributes?.articleBody || ''))
        )
      );
    }
  }, [abstract, article?.attributes?.articleBody]);

  const handleSubmitArticle = (): void => {
    updateArticle({
      variables: {
        articleId: article?.id as string,
        articleData: {
          reviewed: true,
        },
      },
    });
    alert('Article succesfully approved!');
  };

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleEditorAbstractChange = (state: EditorState) => {
    setEditorAbstractState(state);
  };

  const isUserArticleOwner = useMemo(() => {
    return article?.attributes?.author?.data?.id === me?.id;
  }, [article?.attributes?.author?.data?.id, me?.id]);

  const profileLink = formatProfileLink(
    article?.attributes?.author?.data?.attributes?.profileLink || ''
  );

  const meProfileLink = formatProfileLink(me?.profileLink || '');

  const onEdit = () => {
    push(
      `/submit?article=${article?.id}&author=${article?.attributes?.author?.data?.id}`
    );
  };

  const [deleteArticle] = useDeleteArticleMutation();

  const onArticleDelete = async () => {
    await deleteArticle({
      variables: {
        articleId: article?.id as string,
      },
    });

    alert('Article has been deleted succesfully.');
    push(meProfileLink);
  };

  const url =
    article?.attributes?.headerImage &&
    article?.attributes?.headerImage.includes('appspot.com')
      ? getCDNUrl(article?.attributes?.headerImage, 1200, 500)
      : article?.attributes?.headerImage
      ? article?.attributes?.headerImage
      : 'https://picsum.photos/id/11/1200/500';

  return (
    <>
      <Box bgcolor={theme.palette.gray.background} data-testid="article-body">
        <Box
          position="relative"
          width="100%"
          p={0}
          minHeight="400px"
          maxHeight="500px"
          sx={{
            opacity: 1,
            overflowY: 'hidden',
          }}
        >
          <Image
            src={url}
            alt="Article Header"
            fill={true}
            sizes="100vw"
            priority={true}
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <StyledArticleContainer maxWidth="sm">
          <Typography variant={'h1'} fontSize="48px" marginBottom="24px">
            {article?.attributes?.title}
          </Typography>
          {(isAdmin || isUserArticleOwner) && pathname.includes('/article') && (
            <Box>
              <Button
                variant="primary"
                component="button"
                label="submitButton"
                onClick={onEdit}
                testId="edit-article-button"
              >
                Edit
              </Button>
              {isAdmin && (
                <Button
                  variant="danger"
                  component="button"
                  label="submitButton"
                  onClick={() => {
                    onArticleDelete();
                  }}
                  testId="delete-article-button"
                >
                  Delete
                </Button>
              )}
            </Box>
          )}

          {typeof abstract === 'string' &&
            JSON.parse(abstract).blocks[0].text !== '' && (
              <DynamicEditor
                toolbarHidden
                readOnly
                editorState={editorAbstractState}
                onEditorStateChange={handleEditorAbstractChange}
                wrapperClassName={'wrapperHidden'}
                editorClassName={'editorHidden'}
              />
            )}
          <Box mx={2} display="flex" flexWrap="wrap" alignItems="center">
            <Typography fontSize="16px">
              By
              <Link
                href={profileLink}
                target={profileLink?.includes('/user/') ? '_self' : '_blank'}
                style={{ color: theme.palette.green.category }}
              >
                {' '}
                {article?.attributes?.author?.data?.attributes?.name}{' '}
              </Link>{' '}
              - {dateCalculator(article?.attributes?.dateCreated)} -{' '}
              {article?.attributes?.readTime} minute read -{' '}
              {article?.attributes?.views} views
            </Typography>
            {article?.id && (
              <Box>
                <LikeButton
                  articleId={article?.id}
                  liked={article?.attributes?.myLike || false}
                />
                {article?.attributes?.articleLink && (
                  <ShareButton
                    url={article?.attributes?.articleLink}
                    title={'Share article'}
                  />
                )}
                <ClapButton
                  articleId={article?.id}
                  clapsCount={article?.attributes?.claps ?? 0}
                  myClaps={article?.attributes?.myClap || false}
                />
              </Box>
            )}
          </Box>

          {typeof article?.attributes?.articleBody === 'string' &&
            JSON.parse(article?.attributes?.articleBody).blocks === null && (
              <Typography marginBottom="24px" fontSize="22px">
                {article?.attributes.articleBody}
              </Typography>
            )}
          {typeof article?.attributes?.articleBody === 'string' &&
            JSON.parse(article?.attributes?.articleBody).blocks !== null && (
              <DynamicEditor
                toolbarHidden
                readOnly
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName={'wrapperHidden'}
                editorClassName={'editorHidden'}
              />
            )}

          {typeof article?.attributes?.articleBody === 'object' && (
            <DynamicEditor
              toolbarHidden
              readOnly
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName={'wrapperHidden'}
              editorClassName={'editorHidden'}
            />
          )}
        </StyledArticleContainer>
      </Box>
      {!article?.attributes?.reviewed &&
        isAdmin &&
        !pathname.includes('/submit') && (
          <div
            style={{
              paddingTop: '30px',
              paddingLeft: '45%',
              paddingRight: '45%',
            }}
            data-testid="approve-button"
          >
            <Button
              variant="primary"
              component="button"
              label="approveButton"
              onClick={() => handleSubmitArticle()}
            >
              Approve
            </Button>
          </div>
        )}
    </>
  );
};
