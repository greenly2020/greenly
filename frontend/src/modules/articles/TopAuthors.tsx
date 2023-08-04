import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Box, Grid, Container } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
// import Typography from '@material-ui/core/Typography';
// import { AuthorCard } from 'uiCore/components/AuthorCard/index';

const GET_TOP_AUTHORS = gql`
  query getTopAuthors {
    users(limit: 6, order_by: { articles_aggregate: { count: desc } }) {
      bio
      id
      name
      profileLink
      profilePicture
      username
    }
  }
`;

// const useStyles = makeStyles(theme => ({
//   topAuthorsRoot: {
//     backgroundColor: '#EEEEEE',
//     fontFamily: 'Avenir Next',
//   },
//   textHeader: {
//     color: '#07C25E',
//     fontWeight: 'bold',
//     fontFamily: 'Avenir Next',
//     marginBottom: '10px',
//   },
// }));

export interface Author {
  id?: string | null;
  name?: string | null;
  displayName?: string | null;
  bio?: string | null;
  profilePicture?: string | null;
  profileLink?: string | null;
}

export default function TopAuthors() {
  // const classes = useStyles();
  // const { loading, error, data } = useQuery(GET_TOP_AUTHORS);
  // if (error) {
  //   console.log(error);
  //   return <p> There`&apos;`s an error </p>;
  // }
  // if (loading) {
  //   return <LinearProgress color="secondary" />;
  // }
  // const authorData = data.users;
  // const authors = authorData.map((author: Author) => {
  //   // return <AuthorCard key={`top-authors-${author.id}`} variant="primary" size={4} data={author} />;
  // });

  return null;
  // <Box className={classes.topAuthorsRoot} pt={5} pb={5}>
  //   <Container maxWidth="xl">
  //     <Box>
  //       <Typography className={classes.textHeader} variant={'h4'} align="center">
  //         Top Authors This Month:
  //       </Typography>
  //     </Box>

  //     <Grid container style={{ marginTop: '20px' }} spacing={5}>
  //       {authors}
  //     </Grid>
  //   </Container>
  // </Box>
}
