import { Box, Grid, Typography } from "@mui/material";

import { theme } from "@/styles/theme";

const list = [
  {
    title: 'How Can an Editor Contribute?',
    subTitle: 'There are plenty of ways you can get involved. ',
    body: `As a Green Place Editor you will help us welcome new members to the Green Place community. You will encourage like-minded environmental enthusiasts to get involved with Green Place through our Discord, by discussing and supporting environmental activism, and by strengthening the conversations taking place on the site.

    You will decide which submitted articles are worthy of a spot on the Green Place website and ensure that articles published on Green Place are well written with clear points and concise arguments. 
    
    You will be responsible for spreading the word about Green Place’s mission and work to your community. Through attending summits, hosting mixers and posting informational flyers, you will help steer the community towards utilizing Green Place as a resource to foster discussion around the environment. Taking cues from the Sunrise Movement, we intend to be a grassroots organization that thrives online but lives within our community at large.`,
  },
  {
    title: 'Prerequisites',
    body: `Editors should have a strong understanding of environmental issues.

    Editors should have knowledge of the English language and modern English grammar.
    
    Editors should have published at least 3 articles.`,
  },
  {
    title: 'What’s in It for Me?',
    body: `However small, your contribution as a Green Place writer and an editor will help protect the environment. The larger our community, the further our activism reaches.

    You get to be a representative of Green Place’s voice at national and local events.
    
    Each Editor will receive a complimentary eco-friendly Green Place t-shirt.`,
  },
];

const GreenlyEditorsList = () => {
  return list.map(({ title, subTitle, body }, index) => {
    const paragraphs = body.split("\n").filter((para) => para.trim() !== "");
    return (
      <Box
        key={`${title}-${index}`}
        display="flex"
        justifyContent="center"
        padding="30px 0px 30px 0px"
        bgcolor={!(index % 2 === 0) ? theme.palette.gray.background : theme.palette.white}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                align="center"
                pb="10px"
                color={theme.palette.green.primary}
                fontWeight={theme.typography.fontWeightBold}
              >
                {title}
              </Typography>
              {subTitle && (
                <Typography
                  variant="h6"
                  align="center"
                  pb="10px"
                  color={theme.palette.green.primary}
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {subTitle}
                </Typography>
              )}
              <Typography component="ul">
                {paragraphs.map((para, index) => (
                  <Typography key={index} component="li" pb="20px" color={theme.palette.green.primary}>
                    {para}
                  </Typography>
                ))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  });
};

export default GreenlyEditorsList;
