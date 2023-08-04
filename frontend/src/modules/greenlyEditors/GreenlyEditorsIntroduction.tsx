import { Box, Grid, Typography } from "@mui/material";
import { theme } from "@/styles/theme";

const GreenlyEditorsIntroduction = () => {
  return (
    <Box display="flex" justifyContent="center" padding="30px 0px 30px 0px" bgcolor={theme.palette.gray.background}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant="h1"
            color={theme.palette.green.primary}
            fontWeight={theme.typography.fontWeightRegular}
            align="center"
            pb="50px"
          >
            Greenly Editors
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            align="center"
            pb="50px"
            color={theme.palette.green.primary}
            fontWeight={theme.typography.fontWeightRegular}
          >
            Greenly Editors help ensure that all articles published on the website are of the highest caliber. In
            addition to editing articles for the online community, you will also be a voice for Greenly in your
            community at home. This can be as vital as attending environmental summits as a representative of Greenly or
            as simple as putting up a flier in your local coffee shop.
          </Typography>

          <Typography
            variant="h5"
            align="center"
            color={theme.palette.green.primary}
            fontWeight={theme.typography.fontWeightRegular}
          >
            Being named a Greenly Editor comes with great responsibility. You will be a face of the organization and are
            expected to carry yourself as a leader with integrity. As an editor, you will share your environmental
            expertise with others and draw in more discussion within the Greenly community. Working with other
            like-minded environmental leaders, you will help drive the conversation surrounding the Green Revolution
            into a brighter tomorrow.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GreenlyEditorsIntroduction;
