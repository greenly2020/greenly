import Link from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

import { ArticleEntity } from '@/__generated__/types';
import { getCDNUrl } from '@/modules/firebase/services/storage/storage';
import { LikeButton } from '../LikeButton';
import { theme } from '@/styles/theme';
import ShareButton from '../ShareButton/ShareButton';
import { useRouter } from 'next/router';
import { formatProfileLink } from '@/uiCore/utils/utils';

export interface IArticleCardProps {}

export const ArticleCard = ({ cardData }: { cardData: ArticleEntity }) => {
  const { push } = useRouter();
  if (!cardData) {
    return null;
  }

  const cdnUrl =
    cardData?.attributes?.headerImage &&
    cardData?.attributes?.headerImage.includes('appspot.com')
      ? getCDNUrl(cardData?.attributes?.headerImage, 400, 225)
      : cardData?.attributes?.headerImage
      ? cardData?.attributes?.headerImage
      : 'https://picsum.photos/id/11/400/225';

  const profileLink = formatProfileLink(
    cardData?.attributes?.author?.data?.attributes?.profileLink || ''
  );

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={4}
      key={cardData?.id}
      data-testid={`articleCard-${cardData.id}`}
    >
      <Card
        elevation={4}
        sx={{
          position: 'relative',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.16)',
        }}
      >
        <CardMedia
          // onClick={() => push(`/articles/${cardData?.attributes?.articleLink}`)}
          sx={{
            cursor: 'pointer',
            opacity: 1,
            height: '265px',
            position: 'relative',
            background:
              'linear-gradient( to bottom, rgba(83, 83, 83, 0.82) 0%,  rgba(83, 83, 83, 0.82) 66%,rgba(83, 83, 83, 0.82) 66%,rgba(83, 83, 83, 0.82) 100%)',
          }}
        >
          <Link
            href={`/articles/${cardData?.attributes?.articleLink}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Image
              src={cdnUrl}
              alt={`Article Cover`}
              fill={true}
              priority={true}
              sizes="400px"
              style={{
                objectFit: 'cover',
                paddingBottom: '40px',
                opacity: 0.6,
              }}
            />
          </Link>
        </CardMedia>
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            paddingBottom: '40px !important',
            padding: 0,
            color: theme.palette.white,
            marginBottom: 0,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'space-between',
              paddingLeft: '12px',
              paddingRight: '24px',
              textAlign: 'left',
            }}
          >
            <Link
              href={profileLink || '/'}
              target={profileLink?.includes('/user/') ? '_self' : '_blank'}
              style={{
                textDecoration: 'none',
                lineHeight: '30px',
                color: 'inherit',
              }}
            >
              <Typography
                variant="caption"
                fontSize="12px"
                fontWeight={800}
                py={1}
                textTransform="uppercase"
                color={theme.palette.white}
              >
                {cardData?.attributes?.author?.data?.attributes?.name}
              </Typography>
            </Link>
            <Link
              href={`/articles/${cardData?.attributes?.articleLink}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Typography
                color={theme.palette.white}
                variant="h5"
                fontSize="22px"
                fontWeight={500}
                pb={2.5}
              >
                {cardData?.attributes?.title}
              </Typography>
            </Link>
          </Container>
        </CardContent>
        <Grid
          container
          alignItems="center"
          px={2}
          bgcolor={theme.palette.white}
          justifyContent="space-between"
          height="40px"
          position="absolute"
          bottom={0}
        >
          <Grid item xs="auto" pb="5px">
            <Link
              color="inherit"
              href={`/browse/${String(cardData?.attributes?.category)}`}
            >
              <Typography
                variant="caption"
                fontSize="12px"
                color={theme.palette.green.caption}
                fontWeight={theme.typography.fontWeightBold}
              >
                {(cardData?.attributes?.category?.charAt(0)?.toUpperCase() ??
                  '') + (cardData?.attributes?.category?.slice(1) ?? '')}
              </Typography>
            </Link>
          </Grid>
          <Grid item container xs={3}>
            <Grid item xs={6}>
              <ShareButton
                url={`${cardData?.attributes?.articleLink}`}
                title={'Share article'}
              />
            </Grid>

            <Grid item xs={6}>
              <LikeButton
                liked={cardData?.attributes?.myLike || false}
                articleId={String(cardData?.id)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
