import Link from 'next/link';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

import { theme } from '@/styles/theme';

const HelpContainer = styled('div')(() => ({
  color: theme.palette.green.primary,
  fontFamily: theme.typography.fontFamily,
  textAlign: 'center',
  '& .sectionContainer': {
    padding: '30px 3rem 30px 3rem',
  },

  '& .header': {
    marginBottom: '20px',
  },
  '& .graySection': {
    backgroundColor: theme.palette.gray.background,
  },
  '& .paragraphContainer': {
    gap: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  '& .boldText': {
    fontWeight: theme.typography.fontWeightBold,
  },
  '& .link': {
    color: theme.palette.green.secondary,
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export const Help = () => {
  return (
    <HelpContainer>
      <div className={'graySection'}>
        <div className={'sectionContainer'}>
          <Typography className="header" variant="h1">
            How to use Green Place
          </Typography>
          <Typography>
            Welcome to the front page of the green revolution. The Green Place
            website is fairly intuitive but as with all tech there’s always a
            chance you run into bumps along the way. This page will help you get
            through any questions that might arise.
          </Typography>
        </div>
      </div>

      <div>
        <div className={'sectionContainer'}>
          <Typography
            className="header"
            variant="h2"
            fontWeight={theme.typography.fontWeightRegular}
          >
            Creating a Profile
          </Typography>
          <div className={'paragraphContainer'}>
            <Typography>
              To create a profile, first hit Login in the top right of the Green
              Place front page. Choose your preferred method to sign in with.
              Now {`it's`} time to make your profile!
            </Typography>
            {/* image of sign in options */}
            <Typography>
              Click on the profile icon at the top right of the screen then hit
              edit profile in the top right of the user profile screen. You will
              now be prompted to enter your legal name, create a username, and
              choose the link you want your profile to refer to. Below these
              bars enter your bio.
            </Typography>
            {/* image of bio editor */}
            <Typography>
              Bios should be around 100 words or less. Hit submit and voilá!{' '}
              {`You've`} just created a Green Place profile.
            </Typography>
          </div>
        </div>
      </div>
      <div className={'graySection'}>
        <div className={'sectionContainer'}>
          <Typography
            className="header"
            variant="h2"
            fontWeight={theme.typography.fontWeightRegular}
          >
            Submitting an article
          </Typography>
          <div className={'paragraphContainer'}>
            <Typography>
              Now that {`you've`} made a profile, {`you're`} all set to start
              submitting articles. Click on the Submit an Article button at the
              top of the screen.
            </Typography>
            {/* image of greenly submit an article button */}
            {/* image of article editor */}
            <Typography>
              You will be prompted to select a title for your article. Choose
              something that captures the reader’s attention and best reflects
              your {`article's`} content.
            </Typography>
            <Typography>
              Next upload a header image (jpeg, etc formats are accepted) that
              embodies your {`article's`} message. Choose a category for your
              article and the {`article's`} approximate read time. 500 words
              takes about 2 minutes to read. 1500 words take about 5 minutes to
              read.{' '}
            </Typography>
            <Typography>
              Next write your article abstract - a few lines that encapsulates
              the message of your article. This is totally optional so only
              write one if you want to entice readers towards your article. Then
              write the body of the article in the article body.{' '}
            </Typography>
            <Typography>
              A preview of your article will appear below the article body.{' '}
            </Typography>
            <Typography>
              And there you have it! You can now be a contributing writer to
              Green Place. Welcome to the Green Place community.
            </Typography>
            <br />
            <Typography className={'boldText'}>
              For our press kit, check out our{' '}
              <Link className={'link'} href="/about">
                {'About Us'}
              </Link>{' '}
              page
            </Typography>
            <Typography className={'boldText'}>
              For all other specific questions, email ted@greenly.co
            </Typography>
          </div>
        </div>
      </div>
    </HelpContainer>
  );
};

export default Help;
