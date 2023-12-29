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

import dateCalculator from '../../../utils/dateCalculator/dateCalculator';
import { ArticleEntity } from '@/__generated__/types';
import { getCDNUrl } from '@/modules/firebase/services/storage/storage';
import { LikeButton } from '../LikeButton';
import { theme } from '@/styles/theme';
import ShareButton from '../ShareButton/ShareButton';

export interface IArticleCardProps {}

export const ArticleCard = ({ cardData }: { cardData: ArticleEntity }) => {
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
        <Link
          color="inherit"
          href={`/articles/${cardData.attributes?.articleLink}`}
        >
          <CardMedia
            sx={{
              opacity: 1,
              height: '265px',
              position: 'relative',
              background:
                'linear-gradient( to bottom, rgba(83, 83, 83, 0.82) 0%,  rgba(83, 83, 83, 0.82) 66%,rgba(83, 83, 83, 0.82) 66%,rgba(83, 83, 83, 0.82) 100%)',
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
          </CardMedia>
        </Link>
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            paddingBottom: '40px !important',
            padding: 0,
            color: theme.palette.white,
            marginBottom: 0,
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
          }}
        >
          <Container
            sx={{
              paddingLeft: '12px',
              paddingRight: '24px',
              textAlign: 'left',
            }}
          >
            <Typography
              variant="caption"
              fontSize="12px"
              fontWeight={800}
              gutterBottom
              textTransform="uppercase"
              mb={0}
              color={theme.palette.white}
              sx={{ textShadow: 'none' }}
            >
              <Link
                href={`/user/${String(
                  cardData?.attributes?.author?.data?.attributes?.profileLink
                )}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {cardData?.attributes?.author?.data?.attributes?.name}
              </Link>
            </Typography>
            <Typography
              color={theme.palette.white}
              variant="h5"
              fontSize="22px"
              fontWeight={500}
              gutterBottom
              mb={2.5}
              sx={{ textShadow: 'none' }}
            >
              <Link
                href={`/articles/${cardData?.attributes?.articleLink}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {cardData?.attributes?.title}
              </Link>
            </Typography>
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
          <Grid item xs={10} pb="5px">
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

          <Grid item xs={1}>
            <ShareButton
              url={`${cardData?.attributes?.articleLink}`}
              title={'Share article'}
            />
          </Grid>

          <Grid item xs={1}>
            <LikeButton
              liked={cardData?.attributes?.myLike || false}
              articleId={String(cardData?.id)}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
