/* eslint-disable @next/next/no-img-element */
import { Grid, Typography, CardContent, Card, CardMedia } from '@mui/material';
import { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { theme } from '@/styles/theme';
import { Author } from '@/modules/about/team/Team';
import { formatProfileLink } from '@/uiCore/utils/utils';

export interface IAuthorCardProps {
  variant: 'primary' | 'secondary';
  size: 3 | 4 | 6;
  data: Author;
}

export const AuthorCard = forwardRef<HTMLElement, IAuthorCardProps>((props) => {
  const { size } = props;
  const { data } = props;

  if (!data) {
    return null;
  }

  const profileLink = formatProfileLink(data.profileLink || '');
  return (
    <Grid
      color={theme.palette.green.accentLight}
      item
      xs={12}
      sm={6}
      lg={size}
      data-testid={`authorCard-${data.id}`}
    >
      <Card elevation={5} style={{ borderRadius: '10px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Link
                href={profileLink || '/'}
                style={{
                  color: 'inherit',
                }}
              >
                <Typography
                  variant="h2"
                  fontSize="30px"
                  color={theme.palette.green.primary}
                  fontFamily={theme.typography.fontFamily}
                  fontWeight={theme.typography.fontWeightMedium}
                  mb="10px"
                >
                  {data.name}
                </Typography>
              </Link>

              <Link href={profileLink || '/'} style={{ color: 'inherit' }}>
                <Typography
                  variant="body2"
                  color={theme.palette.green.primary}
                  fontFamily={theme.typography.fontFamily}
                  fontWeight={theme.typography.fontWeightMedium}
                >
                  @{data.displayName}
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={4}>
              <CardMedia
                sx={{
                  width: '90px',
                  height: '90px',
                  position: 'relative',
                }}
              >
                <Link href={profileLink || '/'} style={{ color: 'inherit' }}>
                  <Image
                    src={
                      data.profilePicture ?? 'https://picsum.photos/id/11/90/90'
                    }
                    alt={`Author profile picture`}
                    fill={true}
                    priority={true}
                    sizes="90px"
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                </Link>
              </CardMedia>
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
