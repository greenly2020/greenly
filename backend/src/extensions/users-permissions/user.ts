import { createUsersPermissionsUserResolver } from './createUsersPermissionsUserResolver';
import { updateUsersPermissionsUserResolver } from './updateUsersPermissionsUserResolver';

export const user = () => ({
  resolvers: {
    Mutation: {
      createUsersPermissionsUser: createUsersPermissionsUserResolver,
      updateUsersPermissionsUser: updateUsersPermissionsUserResolver,
    },
  },
});
