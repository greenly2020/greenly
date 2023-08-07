/* eslint-disable @next/next/no-img-element */
import { Grid, Typography, CardContent, Card, CardMedia } from '@mui/material';
import { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getCDNUrl } from '@/modules/firebase/services/storage/storage';
import { theme } from '@/styles/theme';
import { Author } from '@/modules/about/team/Team';

export interface IAuthorCardProps {
  variant: 'primary' | 'secondary';
  size: 3 | 4 | 6;
  data: Author;
}

export const AuthorCard = forwardRef<HTMLElement, IAuthorCardProps>((props, ref) => {
  const { size } = props;
  const { data } = props;

  if (!data) {
    return null;
  }

  const cdnUrl =
    data.profilePicture && data.profilePicture?.includes('appspot.com')
      ? getCDNUrl(data.profilePicture, 90, 90)
      : data.profilePicture
      ? data.profilePicture
      : 'https://picsum.photos/id/11/90/90';
  return (
    <Grid color={theme.palette.green.accentLight} item xs={12} sm={6} lg={size} data-testid={`authorCard-${data.id}`}>
      <Card elevation={5} style={{ borderRadius: '10px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                variant="h2"
                fontSize="30px"
                color={theme.palette.green.primary}
                fontFamily={theme.typography.fontFamily}
                fontWeight={theme.typography.fontWeightMedium}
                mb="10px"
              >
                <Link
                  href={`/user/${String(data.profileLink)}`}
                  style={{
                    color: 'inherit',
                  }}
                >
                  {data.name}
                </Link>
              </Typography>

              <Typography
                variant="body2"
                color={theme.palette.green.primary}
                fontFamily={theme.typography.fontFamily}
                fontWeight={theme.typography.fontWeightMedium}
              >
                <Link href={`/user/${String(data.profileLink)}`} style={{ color: 'inherit' }}>
                  @{data.displayName}
                </Link>
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Link href={`/user/${String(data.profileLink)}`} style={{ color: 'inherit' }}>
                <CardMedia
                  sx={{
                    width: '90px',
                    height: '90px',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={cdnUrl ?? ''}
                    alt={`Author profile picture`}
                    fill={true}
                    priority={true}
                    sizes="90px"
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                </CardMedia>
              </Link>
            </Grid>
          </Grid>

          <Typography
            component="p"
            variant="caption"
            color={theme.palette.gray.dark}
            fontFamily={theme.typography.fontFamily}
            fontWeight={theme.typography.fontWeightBold}
            mt="12px"
          >
            {data.bio}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
});

AuthorCard.displayName = 'AuthorCard';
