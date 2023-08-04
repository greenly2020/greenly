import { EditorState } from 'draft-js';
import { useState } from 'react';

export const useEditArticle = () => {
  const [articleTitle, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [authorByAdmin, setAuthorByAdmin] = useState('');
  const handleAuthorByAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorByAdmin(event.target.value);
  };

  const [category, setCategory] = useState('');
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const [readTime, setReadTime] = useState(0);
  const handleReadTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReadTime(Number(event.target.value));
  };

  const [authorName, setAuthorName] = useState('');
  const [authorId, setAuthorId] = useState('');

  const [dateCreated, setDateCreated] = useState(new Date());

  const [headerURL, setHeaderURL] = useState('');

  const [editorStateAbstract, setEditorStateAbstract] = useState(() => EditorState.createEmpty());
  const [editorStateBody, setEditorStateBody] = useState(() => EditorState.createEmpty());

  return {
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
  };
};
