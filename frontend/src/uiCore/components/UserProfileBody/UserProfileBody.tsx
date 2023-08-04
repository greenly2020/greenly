import { ChangeEvent, forwardRef, useRef, useState } from 'react';
import { TextField, Card, CardMedia, CardContent, Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { getStorage, ref, StorageReference } from 'firebase/storage';
import Link from 'next/link';

import {
  deleteFileByReference,
  getFilesByReference,
  getFileUrl,
  uploadFile,
} from '@/modules/firebase/services/storage/storage';
import { UserProfileType } from '@/modules/hooks/useProfile';
import { theme } from '@/styles/theme';
import { Button } from '../Button/index';
import { UsersPermissionsMe } from '@/__generated__/types';
import { useMe } from '@/modules/hooks/useMe';
import UserArticles from '@/modules/articles/UserArticles';
import { useMeUpdateMutation } from '@/modules/user/graphql/mutation/__generated__/meUpdate';

export type UserProfileBodyProps = {
  user: UserProfileType | UsersPermissionsMe;
};

export const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#dedede',
  position: 'relative',
  borderRadius: '5px',
  border: '2px solid white',
  padding: 0,
  overflowWrap: 'break-word',
  textAlign: 'center',
  margin: 4,
  marginBottom: '60px',
  maxWidth: '60%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

export const StyledCardContent = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const UserProfileBody = forwardRef<HTMLElement, UserProfileBodyProps>((props, _) => {
  const { user } = props;
  const { me } = useMe();
  const isMe = user?.id === me?.id;
  const router = useRouter();
  const imagePath = `Images/Profile/${user?.extId}/${user?.extId}`;
  const storage = getStorage();
  const profileImagesRef = ref(storage, imagePath);
  const updateImageInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newImg, setNewImg] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const [meUpdateMutation] = useMeUpdateMutation();

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };
  const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewBio(event.target.value);
  };
  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewImg(event.target.value);
  };
  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewLink(event.target.value);
  };
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const deleteExistingProfileImages = async (reference: StorageReference) => {
    const files = await getFilesByReference(reference);

    files.items.forEach(file => {
      const fileRef = ref(storage, file.fullPath);
      deleteFileByReference(fileRef);
    });
  };

  const handleUpdateProfileImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      try {
        setIsUploading(true);

        await deleteExistingProfileImages(profileImagesRef);

        await uploadFile(profileImagesRef, file);

        const url = await getFileUrl(profileImagesRef);

        await meUpdateMutation({
          variables: {
            meData: {
              profilePicture: url,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
      setIsUploading(false);
    }
  };

  const openModal = () => {
    setNewName(String(user.name ?? ''));
    setNewBio(String(user.bio ?? ''));
    setNewImg(String(user.profilePicture ?? ''));
    setNewLink(String(user.profileLink || ''));
    setNewUsername(String(user.displayName ?? ''));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitModal = async () => {
    await meUpdateMutation({
      variables: {
        meData: {
          bio: newBio,
          name: newName,
          profilePicture: newImg,
          profileLink: newLink,
          displayName: newUsername,
        },
      },
    });
    setIsOpen(false);
    router.push(`user/${newLink}`);
  };

  const handleUpdateImageClick = () => {
    updateImageInputRef?.current?.click();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" bgcolor="#efefef" pt="36px" width="100%">
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Editor"
        style={{
          content: {
            border: '1px solid black',
            textAlign: 'center',
            top: '10%',
            bottom: '10%',
            left: '10%',
            right: '10%',
            borderRadius: '15px',
            backgroundColor: '#dfdfdf',
            display: 'flex',
            overflow: 'auto',
          },
        }}
      >
        <Container maxWidth="xl">
          <form>
            <Typography variant="h6">Profile Editor</Typography>
            <CardMedia
              component="img"
              image={user.profilePicture ?? ''}
              sx={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                margin: 'auto',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            />
            <input
              ref={updateImageInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleUpdateProfileImage}
              disabled={isUploading}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="primary"
                label="change profile picture"
                component="span"
                loading={isUploading}
                disabled={isUploading}
                onClick={handleUpdateImageClick}
                sx={{
                  fontSize: '12px',
                }}
              >
                Update Picture
              </Button>
            </label>

            <Grid container spacing={{ xs: 1, md: 6, lg: 15 }}>
              <Grid item container xs={12} md={6}>
                <Typography mt="20px"> Enter your name: </Typography>
                <TextField
                  id="outlined-multiline-flexibleName"
                  label="Name"
                  fullWidth
                  value={newName}
                  onChange={handleNameChange}
                  variant="outlined"
                />
                <Typography mt="20px"> Enter your username: </Typography>
                <TextField
                  id="outlined-multiline-flexibleUsername"
                  label="Username"
                  fullWidth
                  value={newUsername ?? ''}
                  onChange={handleUsernameChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item container xs={12} md={6}>
                <Typography mt="20px">Enter your profile picture url:</Typography>
                <TextField
                  id="outlined-multiline-flexibleURL"
                  label="Profile Image URL"
                  fullWidth
                  value={newImg}
                  onChange={handleImgChange}
                  variant="outlined"
                />
                <Typography mt="20px">Enter your profile link:</Typography>
                <TextField
                  id="outlined-multiline-flexibleLink"
                  label="Profile Link"
                  fullWidth
                  value={newLink}
                  onChange={handleLinkChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box mt="30px" width="100%">
              <Typography> Enter your updated bio: </Typography>
              <TextField
                id="outlined-multiline-f-full-width"
                label="New Bio"
                multiline
                fullWidth
                minRows={2.5}
                value={newBio}
                onChange={handleBioChange}
                variant="outlined"
              />
            </Box>
            <Box pt="30px" width="100%">
              <Button onClick={closeModal} variant="danger" label="Cancel" component="button">
                Cancel
              </Button>
              <Button onClick={submitModal} variant="primary" label="Submit" component="button">
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Modal>

      <StyledContainer maxWidth="lg">
        <Card
          sx={{
            bgcolor: 'transparent',
            paddingTop: 4,
          }}
          elevation={0}
        >
          <StyledCardContent>
            <Typography color="#002d15" fontSize="48px" align="center">
              {user.name}
            </Typography>

            {isMe && (
              <Button onClick={openModal} variant="primary" label="Edit Profile" component="button">
                <EditOutlined />
              </Button>
            )}
          </StyledCardContent>
          <CardContent>
            <Typography color="#4f4f4f" fontSize="28px" align="center">
              <Link href={isMe ? '/user' : `/user/${user.profileLink}`} style={{ color: 'inherit' }}>
                @{user.displayName}
              </Link>
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            image={user.profilePicture ?? ''}
            style={{
              borderRadius: '50%',
              width: '90px',
              height: '90px',
              margin: 'auto',
              marginTop: '20px',
              marginBottom: '10px',
            }}
          />
          <CardContent>
            <Typography color="#4f4f4f" fontSize="28px" variant="body1" align="center">
              {user.bio}
            </Typography>
          </CardContent>
        </Card>
      </StyledContainer>
      {!isMe && <UserArticles userId={user?.id} />}
      {isMe && <UserArticles userId={user?.id} withLikes />}
    </Box>
  );
});

UserProfileBody.displayName = 'UserProfileBody';
