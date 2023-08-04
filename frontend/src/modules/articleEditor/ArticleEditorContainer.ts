import { styled } from '@mui/system';

import { theme } from '@/styles/theme';

export const ArticleEditorContainer = styled('div')(() => ({
  backgroundColor: 'white',
  paddingTop: '30px',
  '& .editorWrapper': {
    padding: '1rem',
    border: '1px solid #ccc',
    backgroundColor: theme.palette.gray.background,
  },
  '& .editorContainer': {
    backgroundColor: 'white',
    padding: '1rem',
    border: '1px solid #ccc',
    fontFamily: theme.typography.fontFamily,
    lineHeight: '25px',
    fontWeight: theme.typography.fontWeightRegular,
  },
  '& .editorToolbar': {
    border: '1px solid #ccc',
  },
  '& .inputBox': {
    marginBottom: '25px',
    width: '100%',
  },
  '& .inputText': {
    marginTop: '25px',
    marginBottom: '25px',
    // fontFamily: 'AvenirNext-DemiBold',
    // TODO: Add correct fontFamily
    fontFamily: 'sans-serif',
  },
  '& .headerBox': {
    textAlign: 'center',
  },
  '& .articleHeader': {
    marginBottom: 24,
    // fontFamily: 'AvenirNext-Regular',
    // TODO: Add correct fontFamily
    fontFamily: 'sans-serif',
  },
  '& .footerBox': {
    paddingTop: '50px',
    paddingBottom: '50px',
    backgroundColor: theme.palette.gray.background,
    display: 'flex',
    justifyContent: 'center',
  },
}));
