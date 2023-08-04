import React, { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { EditorState, convertToRaw, convertFromRaw, Entity } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { MenuItem, TextField, Container, Typography, Link } from '@mui/material';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import { StorageReference, getBlob, getStorage, ref } from 'firebase/storage';
import {
  deleteFileByReference,
  getFileUrl,
  getFilesByReference,
  uploadFile,
} from '@/modules/firebase/services/storage/storage';
import { CATEGORIES, READ_TIMES } from './constants';
import { useEditArticle } from './useEditArticle';

import { ArticleEditorContainer } from './ArticleEditorContainer';
import { useMe } from '../hooks/useMe';
import { Button } from '@/uiCore';
import { ArticleBody } from '@/uiCore/components/ArticleBody';
import Dialog from '@/uiCore/components/Dialog/Dialog';
import { GetArticleDocument } from '../article/graphql/query/__generated__/getArticle';
import { Article } from '@/__generated__/types';
import { useCreateArticleMutation } from '../article/graphql/mutation/__generated__/create';
import { useUpdateArticleMutation } from '../article/graphql/mutation/__generated__/update';
import { useGetUsersQuery } from '../user/graphql/query/__generated__/getUsers';
import { GetArticlesListDocument } from '../articles/graphql/query/__generated__/getArticlesList';

const DynamicEditor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
  ssr: false,
});

function ArticleEditor() {
  const { push, query, isReady } = useRouter();
  const { me, isAdmin } = useMe();

  if (isReady && !me) {
    push('/');
  }

  const addImageInputRef = useRef<HTMLInputElement>(null);

  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogBody, setDialogBody] = useState<string>('');
  const [redirectionLocation, setRedirectionLocation] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [initAbstractUrl, setInitAbstractUrl] = useState<string[]>([]);
  const [initBodyUrl, setInitBodyUrl] = useState<string[]>([]);
  const [prevArticleImagesRef, setPrevArticleImagesRef] = useState<StorageReference | null>(null);

  const storage = getStorage();

  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const {
    articleTitle,
    setTitle,
    handleTitleChange,
    authorByAdmin,
    setAuthorByAdmin,
    handleAuthorByAdminChange,
    category,
    setCategory,
    handleCategoryChange,
    readTime,
    setReadTime,
    handleReadTimeChange,
    authorId,
    setAuthorId,
    authorName,
    setAuthorName,
    dateCreated,
    setDateCreated,
    headerURL,
    setHeaderURL,
    editorStateAbstract,
    setEditorStateAbstract,
    editorStateBody,
    setEditorStateBody,
  } = useEditArticle();

  const [isUploading, setIsUploading] = useState(false);

  const editingPermitted = query?.article && (query?.author === me?.id || isAdmin);
  useQuery(GetArticleDocument, {
    onCompleted: data => {
      const articleData = data?.article?.data?.attributes as Article;
      const abstract = JSON.parse(articleData?.abstract || '{}');
      const articleBody = JSON.parse(articleData?.articleBody || '{}');
      const blocksFromAbstract = convertFromRaw(abstract);
      const blocksFromBody = convertFromRaw(articleBody);
      const abstractUrl = Object.values(abstract?.entityMap)?.map((item: any) => item?.data?.src);
      setInitAbstractUrl(abstractUrl);
      const articleBodyUrl = Object.values(articleBody?.entityMap)?.map((item: any) => item?.data?.src);
      setInitBodyUrl(articleBodyUrl);
      setEditorStateAbstract(EditorState.createWithContent(blocksFromAbstract));
      setEditorStateBody(EditorState.createWithContent(blocksFromBody));
      setCategory(articleData?.category as string);
      setTitle(articleData?.title as string);
      setHeaderURL(articleData?.headerImage as string);
      setReadTime(articleData?.readTime as number);
      setAuthorByAdmin(articleData?.author?.data?.id as string);
      setAuthorId(articleData?.author?.data?.id as string);
      setAuthorName(articleData?.author?.data?.attributes?.name as string);
      setDateCreated(articleData?.dateCreated);
    },
    variables: { id: Number(query?.article) },
    skip: !editingPermitted,
  });

  const { data: usersDataQuery } = useGetUsersQuery({
    variables: {
      pagination: { limit: -1 },
      sort: ['name'],
    },
  });
  const usersData = useMemo(
    () => usersDataQuery?.usersPermissionsUsers?.data,
    [usersDataQuery?.usersPermissionsUsers?.data]
  );

  const imageExists = (url: string) => {
    const image = new Image();
    image.src = url;
    if (!image.complete) {
      return url;
    }
    return url;
  };

  const styleMap = {
    articleText: {
      // fontFamily: 'AvenirNext',
      // TODO: Add correct fontFamily
      fontFamily: 'sans-serif',
    },
  };

  const articleAuthor =
    isAdmin && authorByAdmin ? authorByAdmin : authorId ? authorId : (query?.author as string) || me?.id;

  const deleteOldArticleImages = (initUrl: string[], isBody?: boolean) => {
    const blocks = isBody
      ? convertToRaw(editorStateBody.getCurrentContent())
      : convertToRaw(editorStateAbstract.getCurrentContent());
    const urls = Object.values(blocks?.entityMap)?.map((item: any) => item?.data?.src);
    initUrl?.forEach(item => {
      if (!urls.some(url => url === item)) {
        console.log('debug > blocks===', item);
      }
    });
  };

  const submit = () => {
    if (initAbstractUrl.length) {
      deleteOldArticleImages(initAbstractUrl);
    }
    if (initBodyUrl.length) {
      deleteOldArticleImages(initBodyUrl, true);
    }

    const articleData = {
      title: articleTitle,
      abstract: JSON.stringify(convertToRaw(editorStateAbstract.getCurrentContent())),
      articleBody: JSON.stringify(convertToRaw(editorStateBody.getCurrentContent())),
      category,
      dateCreated,
      headerImage: imageExists(headerURL),
      readTime,
      reviewed: false,
      author: articleAuthor,
    };

    // TODO: remove this error dialog in favor of inline errors
    if (articleTitle === '') {
      setDialogTitle('Form Error');
      setDialogBody('Please enter a title then try again');
      setIsDialogOpen(true);
      return false;
    } else if (isAdmin && authorByAdmin === '' && !authorId) {
      setDialogTitle('Form Error');
      setDialogBody('Please choose an Author then try again');
      setIsDialogOpen(true);
      return false;
    } else if (JSON.stringify(convertToRaw(editorStateAbstract.getCurrentContent())) === '') {
      setDialogTitle('Form Error');
      setDialogBody('Please enter an abstract then try again');
      setIsDialogOpen(true);
      return false;
    } else if (JSON.stringify(convertToRaw(editorStateBody.getCurrentContent())) === '') {
      setDialogTitle('Form Error');
      setDialogBody('Please enter an article body then try again');
      setIsDialogOpen(true);
      return false;
    } else if (category === '') {
      setDialogTitle('Form Error');
      setDialogBody('Please choose a category then try again');
      setIsDialogOpen(true);
      return false;
    } else if (readTime === 0) {
      setDialogTitle('Form Error');
      setDialogBody('Please set a read time then try again');
      setIsDialogOpen(true);
      return false;
    } else {
      if (editingPermitted) {
        updateArticle({
          variables: { articleId: query?.article as string, articleData },
          refetchQueries: [GetArticlesListDocument],
        }).finally(() => {
          setDialogTitle('Article submitted successfully.');
          setDialogBody('Article will be published pending review.');
          setRedirectionLocation('/');
          setIsDialogOpen(true);
        });
      } else {
        createArticle({
          variables: { articleData },
        }).finally(() => {
          setDialogTitle('Article submitted successfully.');
          setDialogBody('Article will be published pending review.');
          setRedirectionLocation('/');
          setIsDialogOpen(true);
        });
      }
      return true;
    }
  };

  const previewData = useMemo(
    () => ({
      id: '0',
      title: articleTitle,
      abstract: JSON.stringify(convertToRaw(editorStateAbstract.getCurrentContent())),
      articleBody: JSON.stringify(convertToRaw(editorStateBody.getCurrentContent())),
      dateCreated: dateCreated,
      readTime: Number(readTime),
      headerImage: headerURL,
      views: 0,
      claps: 3,
      author: {
        data: {
          id: articleAuthor,
          attributes:
            isAdmin && authorByAdmin
              ? usersData?.find(user => user?.id === authorByAdmin)?.attributes
              : {
                  name: authorName || me?.name || 'name',
                  profileLink: me?.profileLink,
                },
        },
      },
    }),
    [
      articleTitle,
      editorStateAbstract,
      editorStateBody,
      dateCreated,
      readTime,
      headerURL,
      articleAuthor,
      isAdmin,
      authorByAdmin,
      usersData,
      authorName,
      me?.name,
      me?.profileLink,
    ]
  );

  const deleteExistingHeaderImage = async (reference: StorageReference) => {
    const files = await getFilesByReference(reference);

    files.items.forEach(file => {
      const fileRef = ref(storage, file.fullPath);
      deleteFileByReference(fileRef);
    });
  };
  const formData = new FormData();

  const handleUpdateHeaderImage = async (event: React.ChangeEvent<HTMLInputElement>, author: string) => {
    const imagePath = `Images/Article/${author}/${Date.now()}`;
    const articleImagesRef = ref(storage, imagePath);
    if (event.target.files) {
      const file = event.target.files[0];
      formData.append('file', file);
      try {
        setIsUploading(true);
        // TODO Add here mutation for delete image by url - for ADMIN only
        await deleteExistingHeaderImage(articleImagesRef);
        await uploadFile(articleImagesRef, file);

        const url = await getFileUrl(articleImagesRef);
        setPrevArticleImagesRef(articleImagesRef);

        setHeaderURL(url);
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    } else {
      try {
        setIsUploading(true);
        const blob = await getBlob(prevArticleImagesRef as StorageReference);
        await uploadFile(articleImagesRef, blob);
        // TODO Add here mutation for delete image by url - for ADMIN only
        await deleteExistingHeaderImage(prevArticleImagesRef as StorageReference);
        const url = await getFileUrl(articleImagesRef);
        setPrevArticleImagesRef(articleImagesRef);

        setHeaderURL(url);
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    }
  };

  const handleUploadAbstractImage = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const imagePath = `Images/Article/${articleAuthor}/editor/${Date.now()}`;
        const abstractImagesRef = ref(storage, imagePath);
        const form_data = new FormData();
        form_data.append('file', file);
        await uploadFile(abstractImagesRef, file);
        const abstractUrl = await getFileUrl(abstractImagesRef);
        setInitAbstractUrl([...initAbstractUrl, abstractUrl]);
        resolve({ data: { link: abstractUrl } });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadBodyImage = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const imagePath = `Images/Article/${articleAuthor}/editor/${Date.now()}`;
        const bodyImagesRef = ref(storage, imagePath);
        const form_data = new FormData();
        form_data.append('file', file);
        await uploadFile(bodyImagesRef, file);
        const bodyUrl = await getFileUrl(bodyImagesRef);
        setInitBodyUrl([...initBodyUrl, bodyUrl]);
        resolve({ data: { link: bodyUrl } });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageClick = () => {
    addImageInputRef?.current?.click();
  };

  const handleDialogClose = () => {
    if (redirectionLocation) {
      push(redirectionLocation);
      return;
    }

    setIsDialogOpen(false);
    setDialogTitle('');
    setDialogBody('');
    setRedirectionLocation(null);
  };

  return (
    <ArticleEditorContainer>
      <Dialog open={isDialogOpen} handleClose={handleDialogClose} title={dialogTitle} body={dialogBody} />
      <Container maxWidth="sm" style={{ marginBottom: '75px' }}>
        <div className={'headerBox'}>
          <Typography className={'articleHeader'} variant={'h1'}>
            {!editingPermitted ? 'Submit an Article' : 'Edit'}
          </Typography>
        </div>

        <div className={'inputBox'}>
          <Typography className={'inputText'}> Article Title: </Typography>
          <TextField
            id="outlined-multiline-f-full-width"
            label="Title"
            multiline
            fullWidth
            maxRows={3}
            value={articleTitle}
            onChange={handleTitleChange}
            variant="outlined"
          />
        </div>
        <div className={'inputBox'}>
          <Typography className={'inputText'}> Header Image</Typography>
          <input
            ref={addImageInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={event => handleUpdateHeaderImage(event, articleAuthor as string)}
            disabled={isUploading}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="primary"
              size="lg"
              label="change profile picture"
              component="span"
              loading={isUploading}
              disabled={isUploading}
              onClick={handleAddImageClick}
              sx={{
                fontSize: '12px',
              }}
            >
              Set Header Image
            </Button>
          </label>
          <br />
          <Link href={headerURL} target="_blank" underline="hover" fontSize="14px">
            {headerURL}
          </Link>
        </div>
        <div style={{ width: '320px' }}>
          {isAdmin && (
            <div className={'inputBox'}>
              <Typography className={'inputText'}> Author: </Typography>
              <TextField
                id="filled-select-currency"
                fullWidth
                select
                label="Author"
                value={authorByAdmin}
                onChange={event => {
                  handleAuthorByAdminChange(event as React.ChangeEvent<HTMLInputElement>);
                  handleUpdateHeaderImage(event as React.ChangeEvent<HTMLInputElement>, event.target.value as string);
                }}
                helperText="Please select article's author"
                variant="outlined"
                disabled={Boolean(query?.author)}
              >
                {usersData?.map(user => (
                  <MenuItem key={user?.attributes?.profileLink} value={user?.id as string}>
                    {user?.attributes?.name}
                    {/* TODO add email for old users */}
                    {/* {user?.attributes?.email?.includes('###old###') ? ' - old account' : ''} */}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
          <div className={'inputBox'}>
            <Typography className={'inputText'}> Category: </Typography>
            <TextField
              id="filled-select-currency"
              fullWidth
              select
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              helperText="Please select your article's category"
              variant="outlined"
            >
              {CATEGORIES.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={'inputBox'}>
            <Typography className={'inputText'}> Approximate Read Time: </Typography>
            <TextField
              id="filled-select-currency"
              fullWidth
              select
              label="Read Time"
              value={readTime || ''}
              onChange={handleReadTimeChange}
              helperText="Please select your article's read time"
              variant="outlined"
            >
              {READ_TIMES.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <Typography className={'inputText'}> Article Abstract (optional, max 500 words): </Typography>
        <DynamicEditor
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image', 'remove', 'history'],
            // TODO: Add correct fontFamily
            fontFamily: {
              options: ['sans-serif'],
            },
            image: {
              uploadCallback: handleUploadAbstractImage,
              urlEnabled: false,
              uploadEnabled: true,
              inputAccept: 'image/jpeg,image/jpg,image/png',
              previewImage: true,
            },
          }}
          editorState={editorStateAbstract}
          onEditorStateChange={setEditorStateAbstract}
          wrapperClassName={'editorWrapper'}
          editorClassName={'editorContainer'}
          stripPastedStyles={true}
          toolbarClassName={'editorToolbar'}
          customStyleMap={styleMap}
          spellCheck
        />
        <Typography className={'inputText'}> Article Body (max 3000): </Typography>
        <DynamicEditor
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'image', 'remove', 'history'],
            // TODO: Add correct fontFamily
            fontFamily: {
              options: ['sans-serif'],
            },
            image: {
              uploadCallback: handleUploadBodyImage,
              urlEnabled: false,
              uploadEnabled: true,
              inputAccept: 'image/jpeg,image/jpg,image/png',
              previewImage: true,
            },
          }}
          stripPastedStyles={true}
          editorState={editorStateBody}
          onEditorStateChange={setEditorStateBody}
          wrapperClassName={'editorWrapper'}
          editorClassName={'editorContainer'}
          toolbarClassName={'editorToolbar'}
          customStyleMap={styleMap}
          spellCheck
        />
        <Typography className={'inputText'}> Article Preview: </Typography>
      </Container>
      <ArticleBody article={{ id: previewData?.id, attributes: previewData }} />
      <div className={'footerBox'}>
        <Button onClick={() => submit()} variant="primary" label="Submit" component="button">
          Submit
        </Button>
      </div>
    </ArticleEditorContainer>
  );
}

export default ArticleEditor;
