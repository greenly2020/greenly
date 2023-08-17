export const resolversConfig = {
  'Mutation.meUpdate': {
    auth: true,
  },
  'UsersPermissionsUser.email': {
    policies: [
      {
        name: 'global::is-admin',
      },
    ],
  },
};
