export type CreateUsersPermissionsUserInputArgs = {
  data: {
    email: string;
    bio: string;
    name: string;
    profilePicture: string;
    profileLink: string;
    displayName: string;
  };
};

export type UpdateUsersPermissionsUserInputArgs = {
  id: string | number;
  data: {
    email: string;
    bio: string;
    name: string;
    profilePicture: string;
    profileLink: string;
    displayName: string;
  };
};
